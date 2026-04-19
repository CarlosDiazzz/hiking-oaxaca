# syntax = docker/dockerfile:experimental

ARG PHP_VERSION=8.4
ARG NODE_VERSION=18
FROM ubuntu:22.04 AS base
LABEL fly_launch_runtime="laravel"

ARG PHP_VERSION
ENV DEBIAN_FRONTEND=noninteractive \
    COMPOSER_ALLOW_SUPERUSER=1 \
    COMPOSER_HOME=/composer \
    COMPOSER_MAX_PARALLEL_HTTP=24 \
    PHP_PM_MAX_CHILDREN=10 \
    PHP_PM_START_SERVERS=3 \
    PHP_MIN_SPARE_SERVERS=2 \
    PHP_MAX_SPARE_SERVERS=4 \
    PHP_DATE_TIMEZONE=UTC \
    PHP_DISPLAY_ERRORS=Off \
    PHP_ERROR_REPORTING=22527 \
    PHP_MEMORY_LIMIT=256M \
    PHP_MAX_EXECUTION_TIME=90 \
    PHP_POST_MAX_SIZE=100M \
    PHP_UPLOAD_MAX_FILE_SIZE=100M \
    PHP_ALLOW_URL_FOPEN=Off

# 1. Install PHP 8.4 (sin Apache, usando nginx + php-fpm)
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
COPY .fly/php/ondrej_ubuntu_php.gpg /etc/apt/trusted.gpg.d/ondrej_ubuntu_php.gpg

RUN echo "deb https://ppa.launchpadcontent.net/ondrej/php/ubuntu jammy main" > /etc/apt/sources.list.d/ondrej-ubuntu-php.list \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get update \
    # Herramientas base del sistema (sin apache2)
    && apt-get install -y --no-install-recommends \
       gnupg2 \
       ca-certificates \
       git-core \
       curl \
       zip \
       unzip \
       rsync \
       vim-tiny \
       htop \
       sqlite3 \
       nginx \
       supervisor \
       cron \
    # PHP 8.4 con php-fpm (sin libapache2-mod-php que arrastra apache2-bin)
    && apt-get install -y --no-install-recommends \
       php8.4 \
       php8.4-cli \
       php8.4-fpm \
       php8.4-curl \
       php8.4-mbstring \
       php8.4-xml \
       php8.4-pgsql \
       php8.4-sqlite3 \
       php8.4-bcmath \
       php8.4-gd \
       php8.4-intl \
       php8.4-zip \
    && ln -sf /usr/sbin/php-fpm8.4 /usr/sbin/php-fpm \
    && mkdir -p /var/www/html/public \
    && echo "index" > /var/www/html/public/index.php \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

# 2. Copiar archivos de configuración
COPY .fly/nginx/ /etc/nginx/
COPY .fly/fpm/ /etc/php/${PHP_VERSION}/fpm/
COPY .fly/supervisor/ /etc/supervisor/
COPY .fly/entrypoint.sh /entrypoint
COPY .fly/start-nginx.sh /usr/local/bin/start-nginx
RUN chmod 754 /usr/local/bin/start-nginx

# 3. Copiar código de la aplicación
COPY . /var/www/html
WORKDIR /var/www/html

# 4. Instalar dependencias de la aplicación
RUN composer install --optimize-autoloader --no-dev \
    && mkdir -p storage/logs \
    && php artisan optimize:clear \
    && chown -R www-data:www-data /var/www/html \
    && echo 'MAILTO=""' > /etc/cron.d/laravel \
    && echo '* * * * * www-data /usr/bin/php /var/www/html/artisan schedule:run' >> /etc/cron.d/laravel \
    && sed -i='' '/->withMiddleware(function (Middleware $middleware) {/a\
        $middleware->trustProxies(at: "*");\
    ' bootstrap/app.php \
    && if [ -d .fly ]; then cp .fly/entrypoint.sh /entrypoint; chmod +x /entrypoint; fi


# -------------------------------------------------------
# Multi-stage: compilar assets estáticos con Node
# -------------------------------------------------------
FROM node:${NODE_VERSION} AS node_modules_go_brrr

WORKDIR /app
COPY . .
COPY --from=base /var/www/html/vendor /app/vendor

RUN if [ -f "vite.config.js" ] || [ -f "vite.config.ts" ]; then \
        ASSET_CMD="build"; \
    else \
        ASSET_CMD="production"; \
    fi; \
    if [ -f "yarn.lock" ]; then \
        yarn install --frozen-lockfile; \
        yarn $ASSET_CMD; \
    elif [ -f "pnpm-lock.yaml" ]; then \
        corepack enable && corepack prepare pnpm@latest-8 --activate; \
        pnpm install --frozen-lockfile; \
        pnpm run $ASSET_CMD; \
    elif [ -f "package-lock.json" ]; then \
        npm ci --no-audit; \
        npm run $ASSET_CMD; \
    else \
        npm install; \
        npm run $ASSET_CMD; \
    fi

# -------------------------------------------------------
# Imagen final: combinar base + assets compilados
# -------------------------------------------------------
FROM base

COPY --from=node_modules_go_brrr /app/public /var/www/html/public-npm
RUN rsync -ar /var/www/html/public-npm/ /var/www/html/public/ \
    && rm -rf /var/www/html/public-npm \
    && chown -R www-data:www-data /var/www/html

EXPOSE 8080
ENTRYPOINT ["/entrypoint"]
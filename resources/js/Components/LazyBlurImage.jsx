import { useState } from 'react';

export default function LazyBlurImage({ src, placeholderSrc, alt }) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="relative overflow-hidden">
            {placeholderSrc ? (
                <img
                    src={placeholderSrc}
                    alt=""
                    aria-hidden="true"
                    className={`absolute inset-0 h-full w-full scale-105 object-cover blur-xl transition-opacity duration-500 ${
                        isLoaded ? 'opacity-0' : 'opacity-100'
                    }`}
                />
            ) : null}

            <img
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                className={`h-full w-full object-cover transition-opacity duration-500 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
            />
        </div>
    );
}

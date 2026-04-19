<?php

namespace App\Providers;

use App\Events\ReservationCreated;
use App\Events\ReservationStatusUpdated;
use App\Listeners\SendReservationNotification;
use App\Listeners\SendStatusChangeNotification;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (config('app.env') === 'production') {
            URL::forceScheme('https');
        }

        Vite::prefetch(concurrency: 3);

        Event::listen(
            ReservationCreated::class,
            SendReservationNotification::class,
        );

        Event::listen(
            ReservationStatusUpdated::class,
            SendStatusChangeNotification::class,
        );
    }
}

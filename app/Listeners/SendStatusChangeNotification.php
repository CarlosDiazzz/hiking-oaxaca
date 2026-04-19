<?php

namespace App\Listeners;

use App\Events\ReservationStatusUpdated;
use App\Mail\ReservationStatusMail;
use Illuminate\Support\Facades\Mail;

class SendStatusChangeNotification
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(ReservationStatusUpdated $event): void
    {
        $cliente = $event->reservation->email ?? $event->reservation->lead_email;

        Mail::to($cliente)
            ->cc([
                'hikeoaxaca@gmail.com',
                'carlosdiazvasquez0406@gmail.com',
            ])
            ->send(new ReservationStatusMail($event->reservation, $event->nuevoEstado));
    }
}

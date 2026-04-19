<?php

namespace App\Listeners;

use App\Events\ReservationCreated;
use App\Mail\ReservationConfirmedMail;
use Illuminate\Support\Facades\Mail;

class SendReservationNotification
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
    public function handle(ReservationCreated $event): void
    {
        $cliente = $event->reservation->email ?? $event->reservation->lead_email;

        Mail::to($cliente)
            ->cc([
                'hikeoaxaca@gmail.com',
                'carlosdiazvasquez0406@gmail.com',
            ])
            ->send(new ReservationConfirmedMail($event->reservation));
    }
}

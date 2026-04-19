<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use App\Models\Reservation;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ReservationCreated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Reservation $reservation)
    {
        //
    }
}

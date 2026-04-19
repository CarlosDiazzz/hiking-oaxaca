<?php

namespace App\Http\Controllers;

use App\Events\ReservationStatusUpdated;
use App\Models\Reservation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function dashboard(): Response
    {
        $today = now()->startOfDay();

        $reservations = Reservation::query()
            ->with('passengers')
            ->get()
            ->sortBy(fn (Reservation $reservation) => abs($today->diffInDays($reservation->tour_date, false)))
            ->values();

        return Inertia::render('Admin/Dashboard', [
            'reservations' => $reservations,
        ]);
    }

    public function updateReservationStatus(Request $request, Reservation $reservation): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:pending,confirmed,cancelled'],
        ]);

        $currentStatus = $reservation->status;
        $nextStatus = $validated['status'];

        if (
            ($currentStatus === 'confirmed' && $nextStatus === 'cancelled') ||
            ($currentStatus === 'cancelled' && $nextStatus === 'confirmed')
        ) {
            throw ValidationException::withMessages([
                'status' => 'No se permite cambiar entre reservas confirmadas y canceladas.',
            ]);
        }

        if ($currentStatus === $nextStatus) {
            return back();
        }

        $reservation->update([
            'status' => $nextStatus,
        ]);

        event(new ReservationStatusUpdated($reservation, $nextStatus));

        return back();
    }
}

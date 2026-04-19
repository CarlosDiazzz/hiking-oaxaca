<?php

namespace App\Http\Controllers;

use App\Models\Passenger;
use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ReservationController extends Controller
{
    public function checkAvailability(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'date' => ['required', 'date_format:Y-m-d'],
        ]);

        $tourDate = Carbon::createFromFormat('Y-m-d', $validated['date'])->toDateString();
        $maxCapacity = 8;

        $occupiedSpots = Passenger::query()
            ->whereHas('reservation', function ($query) use ($tourDate): void {
                $query
                    ->whereDate('tour_date', $tourDate)
                    ->whereIn('status', ['pending', 'confirmed']);
            })
            ->count();

        return response()->json([
            'available_spots' => $maxCapacity - $occupiedSpots,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'lead_name' => ['nullable', 'string', 'max:255'],
            'lead_email' => ['nullable', 'email', 'max:255'],
            'lead_phone' => ['nullable', 'string', 'max:30'],
            'tour_date' => ['nullable', 'date', 'after_or_equal:today'],
            'payment_method' => ['nullable', 'string', 'max:80'],
            'nombre_completo' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'telefono' => ['nullable', 'string', 'max:30'],
            'fecha_tour' => ['nullable', 'date', 'after_or_equal:today'],
            'metodo_pago' => ['nullable', 'string', 'max:80'],
            'cantidad_personas' => ['nullable', 'integer', 'min:1', 'max:8'],
            'passengers' => ['nullable', 'array', 'min:1', 'max:8'],
            'passengers.*.name' => ['required_with:passengers', 'string', 'max:255'],
            'passengers.*.allergies' => ['nullable', 'string'],
            'passengers.*.medical_conditions' => ['nullable', 'boolean'],
            'alergias' => ['nullable', 'string'],
            'enfermedades_altura' => ['sometimes', 'boolean'],
        ]);

        $leadName = $validated['lead_name'] ?? $validated['nombre_completo'] ?? null;
        $leadEmail = $validated['lead_email'] ?? $validated['email'] ?? null;
        $leadPhone = $validated['lead_phone'] ?? $validated['telefono'] ?? null;
        $tourDateInput = $validated['tour_date'] ?? $validated['fecha_tour'] ?? null;
        $paymentMethod = $validated['payment_method'] ?? $validated['metodo_pago'] ?? null;

        if (! $leadName || ! $leadEmail || ! $leadPhone || ! $tourDateInput || ! $paymentMethod) {
            throw ValidationException::withMessages([
                'reservation' => 'Faltan campos obligatorios para completar la reserva.',
            ]);
        }

        $tourDate = Carbon::parse($tourDateInput);

        if (! $tourDate->isWeekend()) {
            throw ValidationException::withMessages([
                'tour_date' => 'Las expediciones solo operan sábados y domingos.',
            ]);
        }

        $passengersPayload = collect($validated['passengers'] ?? [])
            ->map(fn (array $passenger) => [
                'name' => $passenger['name'],
                'allergies' => $passenger['allergies'] ?? null,
                'medical_conditions' => (bool) ($passenger['medical_conditions'] ?? false),
            ])
            ->values();

        if ($passengersPayload->isEmpty()) {
            $requestedCount = (int) ($validated['cantidad_personas'] ?? 1);

            $passengersPayload->push([
                'name' => $leadName,
                'allergies' => $validated['alergias'] ?? null,
                'medical_conditions' => (bool) ($validated['enfermedades_altura'] ?? false),
            ]);

            for ($index = 2; $index <= $requestedCount; $index++) {
                $passengersPayload->push([
                    'name' => "Acompañante {$index}",
                    'allergies' => null,
                    'medical_conditions' => false,
                ]);
            }
        }

        $requestedSpots = $passengersPayload->count();
        $maxCapacity = 8;
        $occupiedSpots = Passenger::query()
            ->whereHas('reservation', function ($query) use ($tourDate): void {
                $query
                    ->whereDate('tour_date', $tourDate->toDateString())
                    ->whereIn('status', ['pending', 'confirmed']);
            })
            ->count();

        if ($occupiedSpots + $requestedSpots > $maxCapacity) {
            $remainingSpots = max(0, $maxCapacity - $occupiedSpots);

            throw ValidationException::withMessages([
                'passengers' => "Cupo excedido para esta fecha. Solo quedan {$remainingSpots} lugares.",
            ]);
        }

        $reservation = DB::transaction(function () use ($leadName, $leadEmail, $leadPhone, $tourDate, $paymentMethod, $passengersPayload): Reservation {
            $reservation = Reservation::query()->create([
                'lead_name' => $leadName,
                'lead_email' => $leadEmail,
                'lead_phone' => $leadPhone,
                'tour_date' => $tourDate->toDateString(),
                'payment_method' => $paymentMethod,
                'status' => 'pending',
            ]);

            $reservation->passengers()->createMany(
                $passengersPayload
                    ->map(fn (array $passenger) => [
                        'name' => $passenger['name'],
                        'allergies' => $passenger['allergies'],
                        'medical_conditions' => $passenger['medical_conditions'],
                    ])
                    ->all(),
            );

            return $reservation;
        });

        event(new \App\Events\ReservationCreated($reservation));

        return redirect('/')->with('success', 'Tus datos fueron enviados para su revisión. Te contactaremos pronto.');
    }
}

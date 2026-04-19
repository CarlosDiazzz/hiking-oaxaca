<x-mail::message>
# Estado de reserva actualizado

La reserva **{{ $reservation->id }}** cambió a estado: **{{ $nuevoEstado }}**.

- **Titular:** {{ $reservation->lead_name }}
- **Correo:** {{ $reservation->lead_email }}
- **Fecha del tour:** {{ $reservation->tour_date?->format('Y-m-d') }}

<x-mail::button :url="config('app.url')">
Ver plataforma
</x-mail::button>

Saludos,<br>
{{ config('app.name') }}
</x-mail::message>

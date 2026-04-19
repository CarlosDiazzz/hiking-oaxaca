<x-mail::message>
# Reserva recibida

Gracias por registrarte en **{{ config('app.name') }}**.

Hemos recibido tu solicitud y nuestro equipo revisará la disponibilidad final para contactarte con la confirmación.

- **Folio:** {{ $reservation->id }}
- **Titular:** {{ $reservation->lead_name }}
- **Fecha del tour:** {{ $reservation->tour_date?->format('Y-m-d') }}
- **Estado inicial:** {{ $reservation->status }}

<x-mail::button :url="config('app.url')">
Ir al sitio
</x-mail::button>

Saludos,<br>
{{ config('app.name') }}
</x-mail::message>

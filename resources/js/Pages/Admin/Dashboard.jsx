import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useMemo, useState } from 'react';

const statusStyles = {
    pending: 'bg-amber-100 text-amber-800 border border-amber-200',
    confirmed: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
    cancelled: 'bg-rose-100 text-rose-700 border border-rose-200',
};

const statusLabels = {
    pending: 'Pendiente',
    confirmed: 'Confirmada',
    cancelled: 'Cancelada',
};

const formatTourDate = (tourDate) => {
    const parsedDate = new Date(tourDate);

    if (Number.isNaN(parsedDate.getTime())) {
        return 'Fecha no disponible';
    }

    return parsedDate.toLocaleDateString('es-ES', {
        weekday: 'short',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
};

export default function Dashboard({ reservations = [] }) {
    const [openCard, setOpenCard] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);

    const mobileSortedReservations = useMemo(
        () => [...reservations].sort((a, b) => new Date(a.tour_date) - new Date(b.tour_date)),
        [reservations],
    );

    const updateStatus = (reservationId, status) => {
        setUpdatingId(reservationId);

        router.patch(
            route('admin.reservations.status', reservationId),
            { status },
            {
                preserveScroll: true,
                onFinish: () => setUpdatingId(null),
            },
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-[#1A432B]">
                    CRM de Reservas
                </h2>
            }
        >
            <Head title="Admin CRM | Dashboard" />

            <div className="min-h-screen bg-gray-50 px-4 py-6 text-[#1A432B] sm:px-6">
                <div className="mx-auto w-full max-w-3xl">
                    <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                            Dashboard móvil
                        </p>
                        <h1 className="mt-2 text-2xl font-bold text-[#1A432B]">
                            Reservas activas del tour
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Administra pasajeros y estatus desde tarjetas expandibles.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {mobileSortedReservations.length > 0 ? (
                            mobileSortedReservations.map((reservation) => {
                                const isOpen = openCard === reservation.id;
                                const passengersCount = reservation.passengers?.length ?? 0;
                                const isStatusLocked =
                                    reservation.status === 'confirmed' || reservation.status === 'cancelled';

                                return (
                                    <article
                                        key={reservation.id}
                                        className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                                    >
                                        <div className="space-y-3 p-4">
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                                                        Fecha del tour
                                                    </p>
                                                    <p className="mt-1 text-base font-semibold text-[#1A432B]">
                                                        {formatTourDate(reservation.tour_date)}
                                                    </p>
                                                    <p className="mt-1 text-sm text-gray-700">
                                                        {reservation.lead_name}
                                                    </p>
                                                </div>

                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                        statusStyles[reservation.status] ??
                                                        'border border-gray-200 bg-gray-100 text-gray-700'
                                                    }`}
                                                >
                                                    {statusLabels[reservation.status] ?? reservation.status}
                                                </span>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => setOpenCard(isOpen ? null : reservation.id)}
                                                className="w-full rounded-xl bg-[#1A432B] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#245a39]"
                                            >
                                                {isOpen ? 'Ocultar pasajeros' : `Ver ${passengersCount} pasajeros`}
                                            </button>
                                        </div>

                                        {isOpen ? (
                                            <div className="space-y-4 border-t border-gray-200 bg-gray-50 p-4">
                                                <div className="space-y-2">
                                                    {passengersCount > 0 ? (
                                                        reservation.passengers.map((passenger) => (
                                                            <div
                                                                key={passenger.id}
                                                                className={`rounded-xl border p-3 ${
                                                                    passenger.medical_conditions
                                                                        ? 'border-red-200 bg-red-50 text-red-700'
                                                                        : 'border-gray-200 bg-white text-gray-700'
                                                                }`}
                                                            >
                                                                <div className="flex items-center justify-between gap-3">
                                                                    <p className="font-semibold text-[#1A432B]">
                                                                        {passenger.name}
                                                                    </p>
                                                                    {passenger.medical_conditions ? (
                                                                        <span className="text-xs font-bold uppercase tracking-wide text-red-700">
                                                                            Alerta médica
                                                                        </span>
                                                                    ) : null}
                                                                </div>
                                                                <p className="mt-1 text-sm">
                                                                    {passenger.allergies
                                                                        ? `Alergias: ${passenger.allergies}`
                                                                        : 'Sin alergias registradas.'}
                                                                </p>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p className="rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-600">
                                                            No hay pasajeros registrados para esta reserva.
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                                    <button
                                                        type="button"
                                                        disabled={isStatusLocked}
                                                        onClick={() => updateStatus(reservation.id, 'confirmed')}
                                                        className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        Confirmar Reserva
                                                    </button>
                                                    <button
                                                        type="button"
                                                        disabled={isStatusLocked}
                                                        onClick={() => updateStatus(reservation.id, 'cancelled')}
                                                        className="rounded-xl border border-red-300 bg-white px-4 py-2 text-sm font-bold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        Cancelar
                                                    </button>
                                                </div>
                                            </div>
                                        ) : null}
                                    </article>
                                );
                            })
                        ) : (
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center text-gray-600 shadow-sm">
                                Aún no hay reservas cargadas.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

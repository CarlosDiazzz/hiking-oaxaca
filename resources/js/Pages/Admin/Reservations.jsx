import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const statusStyles = {
    pendiente: 'bg-amber-100 text-amber-800',
    confirmada: 'bg-emerald-100 text-emerald-800',
    cancelada: 'bg-rose-100 text-rose-800',
};

export default function Reservations({ reservations = [] }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    CRM de Reservas
                </h2>
            }
        >
            <Head title="Admin | Reservas" />

            <div className="min-h-screen bg-gray-100 py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                        <div className="border-b border-gray-100 px-6 py-5">
                            <h3 className="text-lg font-semibold text-gray-900">Reservas registradas</h3>
                            <p className="mt-1 text-sm text-gray-500">Listado completo ordenado por fecha del tour.</p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Nombre</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Teléfono</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Fecha del Tour</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Personas</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Estado</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 bg-white">
                                    {reservations.length > 0 ? (
                                        reservations.map((reservation) => (
                                            <tr key={reservation.id} className="hover:bg-gray-50/70">
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                    {reservation.nombre_completo}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                    {reservation.email}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                    {reservation.telefono}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                    {reservation.fecha_tour}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                    {reservation.cantidad_personas}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                    <span
                                                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                                                            statusStyles[reservation.estado_reserva] ?? 'bg-gray-100 text-gray-700'
                                                        }`}
                                                    >
                                                        {reservation.estado_reserva}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-500">
                                                No hay reservas registradas todavía.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function GalleryManager({ stops = [] }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-[#1A432B]">
                    Gestor de Galerías
                </h2>
            }
        >
            <Head title="Admin | Gallery Manager" />

            <div className="min-h-screen bg-gray-50 px-4 py-6 text-[#1A432B] sm:px-6">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                        <h1 className="text-2xl font-bold text-[#1A432B]">Galerías por parada</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Selecciona una parada para gestionar fotos, coordenadas y mapa.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {stops.length > 0 ? (
                            stops.map((stop) => (
                                <article
                                    key={stop.id}
                                    className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                                >
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                                        {stop.slug}
                                    </p>
                                    <h3 className="mt-2 text-lg font-bold text-[#1A432B]">{stop.name}</h3>
                                    <p className="mt-1 text-sm text-gray-600">
                                        {stop.photos_count} foto(s) en la galería
                                    </p>

                                    <Link
                                        href={route('admin.gallery.show', stop.id)}
                                        className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[#1A432B] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#245a39]"
                                    >
                                        Gestionar Galería
                                    </Link>
                                </article>
                            ))
                        ) : (
                            <div className="col-span-full rounded-2xl border border-gray-200 bg-white p-6 text-center text-gray-600 shadow-sm">
                                No hay paradas registradas todavía.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

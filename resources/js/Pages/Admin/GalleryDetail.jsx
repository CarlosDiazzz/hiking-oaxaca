import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { compressImage } from '@/Utils/imageCompressor';

export default function GalleryDetail({ stop, photos = [] }) {
    const [isCompressing, setIsCompressing] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);

    const coordinatesForm = useForm({
        latitude: stop.latitude ?? '',
        longitude: stop.longitude ?? '',
        map_embed_url: stop.map_embed_url ?? '',
    });

    const uploadForm = useForm({
        stop_id: stop.id,
        uploader_name: '',
        title: '',
        description: '',
    });

    const handleFilesChange = (event) => {
        const files = event.target.files;
        const fileList = Array.from(files ?? []).filter((file) => file.type.startsWith('image/'));

        if (fileList.length > 5) {
            setUploadError('Solo puedes subir hasta 5 imágenes por lote.');
            setSelectedFiles([]);
            event.target.value = '';
            return;
        }

        setUploadError('');
        setSelectedFiles(fileList);
    };

    const submitCoordinates = (event) => {
        event.preventDefault();

        coordinatesForm.patch(route('admin.gallery.coordinates', stop.id), {
            preserveScroll: true,
        });
    };

    const submitUpload = async (event) => {
        event.preventDefault();

        if (!uploadForm.data.uploader_name.trim()) {
            setUploadError('El nombre del fotógrafo es obligatorio.');
            return;
        }

        if (!uploadForm.data.title.trim()) {
            setUploadError('El título de la foto es obligatorio.');
            return;
        }

        if (selectedFiles.length === 0) {
            setUploadError('Selecciona al menos una imagen para subir.');
            return;
        }

        setIsCompressing(true);
        setUploadError('');

        try {
            const compressedFiles = await Promise.all(selectedFiles.map((file) => compressImage(file)));
            const formData = new FormData();

            formData.append('stop_id', uploadForm.data.stop_id);
            formData.append('uploader_name', uploadForm.data.uploader_name.trim());
            formData.append('title', uploadForm.data.title.trim());
            formData.append('description', uploadForm.data.description.trim());

            compressedFiles.forEach((file) => {
                formData.append('images[]', file, file.name);
            });

            router.post(route('admin.gallery.store'), formData, {
                preserveScroll: true,
                onSuccess: () => {
                    setSelectedFiles([]);
                    uploadForm.reset('uploader_name', 'title', 'description');

                    if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                    }
                },
                onError: (errors) => {
                    const firstError = Object.values(errors)[0];
                    setUploadError(Array.isArray(firstError) ? firstError[0] : firstError);
                },
                onFinish: () => {
                    setIsCompressing(false);
                },
            });
        } catch (error) {
            setUploadError(error.message ?? 'No fue posible comprimir las imágenes.');
            setIsCompressing(false);
        }
    };

    const deletePhoto = (photoId) => {
        router.delete(route('admin.gallery.destroy', photoId), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-[#1A432B]">
                    {stop.name} · Galería
                </h2>
            }
        >
            <Head title={`Admin | ${stop.name}`} />

            <div className="min-h-screen bg-gray-50 px-4 py-6 text-[#1A432B] sm:px-6">
                <div className="mx-auto max-w-6xl space-y-6">
                    <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                                Gestión por parada
                            </p>
                            <h1 className="mt-1 text-2xl font-bold text-[#1A432B]">{stop.name}</h1>
                        </div>
                        <Link
                            href={route('admin.gallery.index')}
                            className="rounded-xl border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                        >
                            Volver al listado
                        </Link>
                    </div>

                    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                        <h3 className="text-lg font-bold text-[#1A432B]">1. Coordenadas del mapa</h3>
                        <form onSubmit={submitCoordinates} className="mt-4 grid gap-4 sm:grid-cols-3">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Latitud</label>
                                <input
                                    type="number"
                                    step="0.0000001"
                                    value={coordinatesForm.data.latitude}
                                    onChange={(event) => coordinatesForm.setData('latitude', event.target.value)}
                                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-[#1A432B] focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Longitud</label>
                                <input
                                    type="number"
                                    step="0.0000001"
                                    value={coordinatesForm.data.longitude}
                                    onChange={(event) => coordinatesForm.setData('longitude', event.target.value)}
                                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-[#1A432B] focus:outline-none"
                                />
                            </div>
                            <div className="sm:col-span-3">
                                <label className="mb-1 block text-sm font-medium text-gray-700">URL Embed de Google Maps</label>
                                <textarea
                                    rows={3}
                                    value={coordinatesForm.data.map_embed_url}
                                    onChange={(event) => coordinatesForm.setData('map_embed_url', event.target.value)}
                                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-[#1A432B] focus:outline-none"
                                />
                            </div>
                            <div className="sm:col-span-3">
                                <button
                                    type="submit"
                                    disabled={coordinatesForm.processing}
                                    className="rounded-xl bg-[#1A432B] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#245a39] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    Guardar Coordenadas
                                </button>
                            </div>
                        </form>
                    </section>

                    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                        <h3 className="text-lg font-bold text-[#1A432B]">2. Subida de fotos</h3>
                        <p className="mt-1 text-sm text-gray-600">
                            Las imágenes se comprimen en cliente antes de enviarse al servidor.
                        </p>

                        <form onSubmit={submitUpload} className="mt-4 space-y-4">
                            <input type="hidden" value={uploadForm.data.stop_id} />

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Nombre del Fotógrafo (@usuario)</label>
                                <div className="flex w-full overflow-hidden rounded-xl border border-gray-300 focus-within:border-[#1A432B]">
                                    <span className="inline-flex items-center bg-gray-100 px-3 text-sm font-medium text-gray-500">@</span>
                                    <input
                                        type="text"
                                        value={uploadForm.data.uploader_name}
                                        onChange={(event) => uploadForm.setData('uploader_name', event.target.value.replace(/^@+/, ''))}
                                        className="w-full border-0 px-3 py-2 text-sm focus:outline-none focus:ring-0"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Título de la foto (ej. Amanecer Supremo)</label>
                                <input
                                    type="text"
                                    value={uploadForm.data.title}
                                    onChange={(event) => uploadForm.setData('title', event.target.value)}
                                    required
                                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-[#1A432B] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Descripción</label>
                                <textarea
                                    rows={3}
                                    value={uploadForm.data.description}
                                    onChange={(event) => uploadForm.setData('description', event.target.value)}
                                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-[#1A432B] focus:outline-none"
                                />
                            </div>

                            <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-5">
                                <label className="block text-sm font-medium text-gray-700">
                                    Selecciona imágenes
                                </label>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFilesChange}
                                    className="mt-3 block w-full text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-[#1A432B] file:px-3 file:py-2 file:text-white hover:file:bg-[#245a39]"
                                />
                                <p className="mt-2 text-xs text-gray-500">
                                    {selectedFiles.length} archivo(s) listos para comprimir y subir.
                                </p>
                            </div>

                            {isCompressing ? (
                                <p className="text-sm text-amber-700">Comprimiendo imágenes...</p>
                            ) : null}
                            {uploadError ? (
                                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{uploadError}</p>
                            ) : null}

                            <button
                                type="submit"
                                disabled={uploadForm.processing || isCompressing}
                                className="rounded-xl bg-[#1A432B] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#245a39] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                Subir a Galería
                            </button>
                        </form>
                    </section>

                    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                        <h3 className="text-lg font-bold text-[#1A432B]">3. Fotos cargadas</h3>

                        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {photos.length > 0 ? (
                                photos.map((photo) => (
                                    <article
                                        key={photo.id}
                                        className="overflow-hidden rounded-xl border border-gray-200 bg-white"
                                    >
                                        <img
                                            src={`/storage/${photo.original_path}`}
                                            alt={photo.title}
                                            className="h-44 w-full object-cover"
                                        />
                                        <div className="space-y-2 p-3">
                                            <p className="text-sm font-semibold text-[#1A432B]">{photo.title || 'Sin título'}</p>
                                            <p className="text-xs font-medium text-gray-700">{photo.uploader_name}</p>
                                            <p className="line-clamp-2 text-xs text-gray-600">
                                                {photo.description || 'Sin descripción'}
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() => deletePhoto(photo.id)}
                                                className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </article>
                                ))
                            ) : (
                                <p className="col-span-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                                    Aún no hay fotos para esta parada.
                                </p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

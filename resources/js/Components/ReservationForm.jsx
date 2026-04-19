import useReservation from '@/Hooks/useReservation';

export default function ReservationForm() {
    const { formData, isLoading, errors, handleInputChange, handleSubmit } = useReservation();

    return (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-white p-6 shadow-md">
            <h2 className="text-xl font-semibold text-slate-900">Reserva tu expedición</h2>

            {/* Datos principales */}
            <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Nombre completo</label>
                <input
                    type="text"
                    name="nombre_completo"
                    value={formData.nombre_completo}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                />
                {errors.nombre_completo ? <p className="mt-1 text-sm text-red-600">{errors.nombre_completo[0]}</p> : null}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2"
                    />
                    {errors.email ? <p className="mt-1 text-sm text-red-600">{errors.email[0]}</p> : null}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Teléfono</label>
                    <input
                        type="text"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2"
                    />
                    {errors.telefono ? <p className="mt-1 text-sm text-red-600">{errors.telefono[0]}</p> : null}
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Fecha del tour</label>
                    <input
                        type="date"
                        name="fecha_tour"
                        value={formData.fecha_tour}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2"
                    />
                    {errors.fecha_tour ? <p className="mt-1 text-sm text-red-600">{errors.fecha_tour[0]}</p> : null}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Cantidad de personas</label>
                    <input
                        type="number"
                        min="1"
                        max="15"
                        name="cantidad_personas"
                        value={formData.cantidad_personas}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2"
                    />
                    {errors.cantidad_personas ? <p className="mt-1 text-sm text-red-600">{errors.cantidad_personas[0]}</p> : null}
                </div>
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Método de pago</label>
                <select
                    name="metodo_pago"
                    value={formData.metodo_pago}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                >
                    <option value="efectivo">Efectivo</option>
                    <option value="transferencia">Transferencia</option>
                </select>
                {errors.metodo_pago ? <p className="mt-1 text-sm text-red-600">{errors.metodo_pago[0]}</p> : null}
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Alergias (opcional)</label>
                <textarea
                    name="alergias"
                    value={formData.alergias}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                />
                {errors.alergias ? <p className="mt-1 text-sm text-red-600">{errors.alergias[0]}</p> : null}
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Notas médicas (opcional)</label>
                <textarea
                    name="notas_medicas"
                    value={formData.notas_medicas}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                />
                {errors.notas_medicas ? <p className="mt-1 text-sm text-red-600">{errors.notas_medicas[0]}</p> : null}
            </div>

            <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                    type="checkbox"
                    name="enfermedades_altura"
                    checked={formData.enfermedades_altura}
                    onChange={handleInputChange}
                    className="rounded border-slate-300"
                />
                Presento enfermedades relacionadas con altura
            </label>

            {errors.general ? <p className="text-sm text-red-600">{errors.general[0]}</p> : null}

            <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-emerald-700 px-4 py-2 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isLoading ? 'Enviando...' : 'Reservar'}
            </button>
        </form>
    );
}

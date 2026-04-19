import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { isWeekend } from 'date-fns';
import { es } from 'date-fns/locale';

registerLocale('es', es);

export default function ReservationCreate() {
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({});
    const [availableSpots, setAvailableSpots] = useState(null);
    const [isLoadingSpots, setIsLoadingSpots] = useState(false);
    
    // Estado adaptado para la nueva arquitectura relacional
    const [formData, setFormData] = useState({
        fecha_tour: null,
        cantidad_personas: 1,
        lead_name: '',
        lead_email: '',
        lead_phone: '',
        metodo_pago: 'transferencia',
        // Array dinámico de pasajeros
        passengers: [
            { name: '', allergies: '', medical_conditions: false }
        ]
    });

    const formatDateForApi = (date) => {
        const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
        return localDate.toISOString().split('T')[0];
    };

    const maxSelectableSpots = availableSpots === null
        ? 5
        : Math.max(0, Math.min(5, availableSpots));

    // Efecto para ajustar el array de pasajeros cuando cambia la cantidad
    useEffect(() => {
        const currentCount = formData.passengers.length;
        const targetCount = parseInt(formData.cantidad_personas);

        if (targetCount > currentCount) {
            // Agregar nuevos pasajeros vacíos
            const newPassengers = Array(targetCount - currentCount).fill({ name: '', allergies: '', medical_conditions: false });
            setFormData(prev => ({ ...prev, passengers: [...prev.passengers, ...newPassengers] }));
        } else if (targetCount < currentCount) {
            // Recortar pasajeros sobrantes
            setFormData(prev => ({ ...prev, passengers: prev.passengers.slice(0, targetCount) }));
        }
    }, [formData.cantidad_personas]);

    // Sincronizar el nombre del titular con el Pasajero 1 (opcional pero muy buena UX)
    useEffect(() => {
        if (formData.lead_name && step === 3) {
            setFormData(prev => {
                const newPass = [...prev.passengers];
                if (!newPass[0].name) newPass[0].name = prev.lead_name;
                return { ...prev, passengers: newPass };
            });
        }
    }, [step, formData.lead_name]);

    useEffect(() => {
        if (!formData.fecha_tour) {
            setAvailableSpots(null);
            setIsLoadingSpots(false);
            return;
        }

        let isActive = true;
        setIsLoadingSpots(true);

        axios.get('/api/availability', {
            params: { date: formatDateForApi(formData.fecha_tour) },
        })
            .then((response) => {
                if (!isActive) {
                    return;
                }

                setAvailableSpots(Number(response.data?.available_spots ?? 0));
            })
            .catch(() => {
                if (!isActive) {
                    return;
                }

                setAvailableSpots(null);
            })
            .finally(() => {
                if (isActive) {
                    setIsLoadingSpots(false);
                }
            });

        return () => {
            isActive = false;
        };
    }, [formData.fecha_tour]);

    useEffect(() => {
        if (maxSelectableSpots <= 0) {
            return;
        }

        const current = Number(formData.cantidad_personas);

        if (Number.isNaN(current) || current < 1 || current > maxSelectableSpots) {
            setFormData((prev) => ({ ...prev, cantidad_personas: 1 }));
        }
    }, [maxSelectableSpots]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: null });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, fecha_tour: date });
        if (errors.fecha_tour) setErrors({ ...errors, fecha_tour: null });
    };

    // Manejador específico para los datos de CADA pasajero
    const handlePassengerChange = (index, field, value) => {
        const updatedPassengers = [...formData.passengers];
        updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };
        setFormData({ ...formData, passengers: updatedPassengers });
        
        // Limpiar error específico si existe
        if (errors[`passenger_${index}`]) {
            const newErrors = { ...errors };
            delete newErrors[`passenger_${index}`];
            setErrors(newErrors);
        }
    };

    const validateStep = () => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.fecha_tour) newErrors.fecha_tour = "Por favor selecciona una fecha.";
            if (availableSpots !== null && availableSpots <= 0) newErrors.fecha_tour = "Lo sentimos, esta ruta está agotada.";
            if (
                availableSpots !== null &&
                availableSpots > 0 &&
                Number(formData.cantidad_personas) > availableSpots
            ) {
                newErrors.cantidad_personas = `Solo quedan ${availableSpots} lugares disponibles para esa fecha.`;
            }
        } else if (step === 2) {
            if (!formData.lead_name.trim()) newErrors.lead_name = "El nombre es obligatorio.";
            if (!formData.lead_email.trim()) newErrors.lead_email = "El correo es obligatorio.";
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.lead_email)) newErrors.lead_email = "Correo inválido.";
            if (!formData.lead_phone.trim()) newErrors.lead_phone = "El teléfono es obligatorio.";
        } else if (step === 3) {
            // Validar que todos los pasajeros tengan nombre
            formData.passengers.forEach((p, idx) => {
                if (!p.name.trim()) newErrors[`passenger_${idx}`] = "El nombre del pasajero es obligatorio.";
            });
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => { if (validateStep()) setStep(step + 1); };
    const prevStep = () => setStep(step - 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateStep()) return;

        const fechaFormateada = formData.fecha_tour ? formatDateForApi(formData.fecha_tour) : null;
        const dataToSend = { ...formData, tour_date: fechaFormateada }; // Backend espera tour_date
        
        // Enviar a Laravel vía Inertia
        router.post('/reservar', dataToSend, {
            preserveScroll: true,
            onError: (err) => {
                // Capturar errores del backend (ej. Cupo lleno)
                if (err.tour_date) setErrors({ ...errors, fecha_tour: err.tour_date });
                else alert("Ocurrió un error. Por favor revisa tus datos.");
            }
        });
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white font-sans text-[#1A432B]">
            <Head title="Reserva tu Expedición | Hiking Oaxaca" />

            {/* Estilos del Calendario Premium (Mantenidos) */}
            <style dangerouslySetInnerHTML={{__html: `
                .react-datepicker { font-family: 'Inter', sans-serif; border: 1px solid #e5e7eb; border-radius: 1.5rem; box-shadow: 0 20px 40px -15px rgba(26,67,43,0.1); padding: 1rem; background-color: #fff; }
                .react-datepicker__header { background-color: transparent; border-bottom: none; padding-bottom: 0.5rem; }
                .react-datepicker__current-month { font-family: 'Playfair Display', serif; font-size: 1.25rem; color: #1A432B; font-weight: 700; margin-bottom: 0.5rem; text-transform: capitalize; }
                .react-datepicker__day-names { margin-top: 0.5rem; }
                .react-datepicker__day-name { color: #9ca3af; font-weight: 600; width: 2.5rem; line-height: 2.5rem; }
                .react-datepicker__day { width: 2.5rem; line-height: 2.5rem; border-radius: 50%; color: #111; font-weight: 500; transition: all 0.2s; margin: 0.2rem; }
                .react-datepicker__day:hover:not(.react-datepicker__day--disabled) { background-color: #f3f4f6; border-radius: 50%; }
                .react-datepicker__day--selected { background-color: #1A432B !important; color: white !important; font-weight: bold; transform: scale(1.1); box-shadow: 0 4px 10px rgba(26,67,43,0.3); }
                .react-datepicker__day--disabled { color: #d1d5db; text-decoration: line-through; opacity: 0.5; }
                .react-datepicker__navigation-icon::before { border-color: #1A432B; border-width: 2px 2px 0 0; }
                .custom-datepicker-wrapper { width: 100%; }
            `}} />

            {/* MITAD IZQUIERDA: Imagen */}
            <div className="hidden md:flex md:w-1/2 bg-black items-end p-12 fixed h-screen top-0 left-0">
                <img src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80" alt="Bosque de Oaxaca" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="relative z-10 text-white">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-[#D4AF37] transition-colors mb-12">
                        ← Volver al inicio
                    </Link>
                    <h2 className="text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Tu aventura comienza aquí.
                    </h2>
                    <p className="text-lg opacity-80 max-w-md">
                        Asegura tu lugar en la Sierra Norte. Grupos reducidos para garantizar una experiencia íntima.
                    </p>
                </div>
            </div>

            {/* MITAD DERECHA: Formulario */}
            <div className="w-full md:w-1/2 md:ml-[50%] flex flex-col justify-start px-8 md:px-16 py-12 min-h-screen overflow-y-auto">
                <div className="md:hidden mb-10">
                    <Link href="/" className="text-sm font-bold tracking-widest uppercase opacity-50 mb-4 block">← Volver</Link>
                    <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Reserva tu lugar</h2>
                </div>

                <div className="flex gap-2 mb-12 max-w-md mx-auto w-full sticky top-0 bg-white/90 backdrop-blur-md pt-4 pb-4 z-20">
                    <div className={`h-1 flex-1 rounded-full transition-colors duration-500 ${step >= 1 ? 'bg-[#1A432B]' : 'bg-gray-200'}`}></div>
                    <div className={`h-1 flex-1 rounded-full transition-colors duration-500 ${step >= 2 ? 'bg-[#1A432B]' : 'bg-gray-200'}`}></div>
                    <div className={`h-1 flex-1 rounded-full transition-colors duration-500 ${step >= 3 ? 'bg-[#1A432B]' : 'bg-gray-200'}`}></div>
                </div>

                <form onSubmit={handleSubmit} className="max-w-md w-full mx-auto" noValidate>
                    
                    {/* PASO 1: Detalles */}
                    {step === 1 && (
                        <div className="animate-fade-in-up">
                            <h3 className="text-2xl font-bold mb-6">Detalles de la expedición</h3>
                            
                            <div className="mb-8">
                                <label className="block text-sm font-bold uppercase tracking-wider mb-4 opacity-70">Selecciona una fecha</label>
                                <DatePicker
                                    selected={formData.fecha_tour}
                                    onChange={handleDateChange}
                                    filterDate={isWeekend}
                                    minDate={new Date()}
                                    locale="es"
                                    inline
                                    wrapperClassName="custom-datepicker-wrapper"
                                />
                                {errors.fecha_tour && <p className="text-red-500 text-xs font-bold mt-2">{errors.fecha_tour}</p>}
                            </div>

                            <div className="mb-8">
                                <label className="block text-sm font-bold uppercase tracking-wider mb-2 opacity-70">Número de Personas</label>
                                <select 
                                    name="cantidad_personas"
                                    value={maxSelectableSpots === 0 ? '' : formData.cantidad_personas}
                                    onChange={handleInputChange}
                                    disabled={maxSelectableSpots === 0}
                                    className="w-full bg-gray-50 border border-gray-200 focus:border-[#1A432B] rounded-xl outline-none p-4 text-lg transition-colors cursor-pointer appearance-none disabled:cursor-not-allowed disabled:bg-gray-100"
                                >
                                    {maxSelectableSpots > 0 ? (
                                        [...Array(maxSelectableSpots)].map((_, i) => (
                                            <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'persona' : 'personas'}</option>
                                        ))
                                    ) : (
                                        <option value="">Sin disponibilidad</option>
                                    )}
                                </select>
                                {isLoadingSpots && (
                                    <p className="mt-2 text-xs font-semibold text-gray-500">Consultando disponibilidad...</p>
                                )}
                                {!isLoadingSpots && availableSpots !== null && availableSpots <= 0 && (
                                    <p className="mt-2 text-sm font-semibold text-red-600">Lo sentimos, esta ruta está agotada.</p>
                                )}
                                {!isLoadingSpots && availableSpots > 0 && (
                                    <p className="mt-2 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                                        ¡Hay disponibilidad! Solo quedan {availableSpots} lugares.
                                    </p>
                                )}
                                {errors.cantidad_personas && <p className="text-red-500 text-xs font-bold mt-2">{errors.cantidad_personas}</p>}
                            </div>

                            <button
                                type="button"
                                onClick={nextStep}
                                disabled={isLoadingSpots || (availableSpots !== null && availableSpots <= 0)}
                                className="w-full bg-[#1A432B] text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#112d1d] transition-colors shadow-lg shadow-[#1A432B]/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#1A432B]"
                            >
                                Continuar
                            </button>
                        </div>
                    )}

                    {/* PASO 2: Contacto Titular */}
                    {step === 2 && (
                        <div className="animate-fade-in-up">
                            <h3 className="text-2xl font-bold mb-6">Datos de contacto</h3>
                            <p className="text-sm opacity-70 mb-6">La persona encargada de la reserva y principal punto de contacto.</p>
                            
                            <div className="mb-6">
                                <label className="block text-sm font-bold uppercase tracking-wider mb-2 opacity-70">Nombre Completo</label>
                                <input type="text" name="lead_name" value={formData.lead_name} onChange={handleInputChange} className={`w-full bg-transparent border-b-2 outline-none py-3 text-lg transition-colors ${errors.lead_name ? 'border-red-500' : 'border-gray-200 focus:border-[#1A432B]'}`} />
                                {errors.lead_name && <p className="text-red-500 text-xs font-bold mt-1">{errors.lead_name}</p>}
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-bold uppercase tracking-wider mb-2 opacity-70">Correo Electrónico</label>
                                <input type="email" name="lead_email" value={formData.lead_email} onChange={handleInputChange} className={`w-full bg-transparent border-b-2 outline-none py-3 text-lg transition-colors ${errors.lead_email ? 'border-red-500' : 'border-gray-200 focus:border-[#1A432B]'}`} />
                                {errors.lead_email && <p className="text-red-500 text-xs font-bold mt-1">{errors.lead_email}</p>}
                            </div>

                            <div className="mb-8">
                                <label className="block text-sm font-bold uppercase tracking-wider mb-2 opacity-70">Teléfono (WhatsApp)</label>
                                <input type="tel" name="lead_phone" value={formData.lead_phone} onChange={handleInputChange} className={`w-full bg-transparent border-b-2 outline-none py-3 text-lg transition-colors ${errors.lead_phone ? 'border-red-500' : 'border-gray-200 focus:border-[#1A432B]'}`} />
                                {errors.lead_phone && <p className="text-red-500 text-xs font-bold mt-1">{errors.lead_phone}</p>}
                            </div>

                            <div className="flex gap-4">
                                <button type="button" onClick={prevStep} className="w-1/3 border border-gray-300 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors">Volver</button>
                                <button type="button" onClick={nextStep} className="w-2/3 bg-[#1A432B] text-white py-4 rounded-full font-bold uppercase tracking-widest shadow-lg">Siguiente</button>
                            </div>
                        </div>
                    )}

                    {/* PASO 3: Pasajeros Dinámicos */}
                    {step === 3 && (
                        <div className="animate-fade-in-up pb-12">
                            <h3 className="text-2xl font-bold mb-2">Seguridad y Pasajeros</h3>
                            <p className="text-sm opacity-70 mb-8">Por seguridad en la montaña, necesitamos conocer a cada integrante.</p>
                            
                            <div className="space-y-6 mb-8">
                                {formData.passengers.map((passenger, index) => (
                                    <div key={index} className="bg-gray-50 border border-gray-200 rounded-2xl p-5 relative overflow-hidden">
                                        {/* Badge de número de pasajero */}
                                        <div className="absolute top-0 right-0 bg-[#D4AF37]/20 text-[#1A432B] px-4 py-1 rounded-bl-xl font-bold text-xs uppercase">
                                            Pasajero {index + 1}
                                        </div>
                                        
                                        <div className="mb-4 mt-2">
                                            <label className="block text-xs font-bold uppercase tracking-wider mb-1 opacity-70">Nombre Completo</label>
                                            <input 
                                                type="text" 
                                                value={passenger.name} 
                                                onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                                                className={`w-full bg-transparent border-b outline-none py-2 transition-colors ${errors[`passenger_${index}`] ? 'border-red-500' : 'border-gray-300 focus:border-[#1A432B]'}`}
                                                placeholder={`Ej. ${index === 0 ? 'Tu nombre' : 'Nombre del acompañante'}`}
                                            />
                                            {errors[`passenger_${index}`] && <p className="text-red-500 text-xs font-bold mt-1">{errors[`passenger_${index}`]}</p>}
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-xs font-bold uppercase tracking-wider mb-1 opacity-70">Alergias (Opcional)</label>
                                            <input 
                                                type="text" 
                                                value={passenger.allergies || ''} 
                                                onChange={(e) => handlePassengerChange(index, 'allergies', e.target.value)}
                                                className="w-full bg-transparent border-b border-gray-300 focus:border-[#1A432B] outline-none py-2 transition-colors"
                                                placeholder="Ej. Nuez, Polvo..."
                                            />
                                        </div>

                                        <label className="flex items-start gap-3 cursor-pointer group p-2 -ml-2 rounded-lg hover:bg-white transition-colors">
                                            <input 
                                                type="checkbox" 
                                                checked={passenger.medical_conditions} 
                                                onChange={(e) => handlePassengerChange(index, 'medical_conditions', e.target.checked)}
                                                className="mt-1 w-5 h-5 accent-[#1A432B] cursor-pointer"
                                            />
                                            <div>
                                                <span className="font-bold text-sm text-red-700 block">Condición cardíaca / Mal de altura</span>
                                                <span className="text-xs opacity-70 block mt-0.5">Marcar solo si tiene antecedentes médicos.</span>
                                            </div>
                                        </label>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <button type="button" onClick={prevStep} className="w-1/3 border border-gray-300 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors">Volver</button>
                                <button type="submit" className="w-2/3 bg-[#D4AF37] text-black py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
                                    Enviar Solicitud
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

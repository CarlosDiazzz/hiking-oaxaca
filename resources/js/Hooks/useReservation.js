import { useState } from 'react';
import { submitReservation } from '@/Services/reservationService';

const initialFormData = {
    nombre_completo: '',
    email: '',
    telefono: '',
    fecha_tour: '',
    cantidad_personas: 1,
    alergias: '',
    enfermedades_altura: false,
    notas_medicas: '',
    metodo_pago: 'efectivo',
};

export default function useReservation() {
    const [formData, setFormData] = useState(initialFormData);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        // Limpieza incremental de errores por campo.
        setErrors((prev) => {
            if (!prev[name]) {
                return prev;
            }

            const next = { ...prev };
            delete next[name];

            return next;
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsLoading(true);
        setErrors({});

        try {
            const result = await submitReservation(formData);

            if (!result.success) {
                setErrors(result.errors);

                return;
            }

            setFormData(initialFormData);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        isLoading,
        errors,
        handleInputChange,
        handleSubmit,
    };
}

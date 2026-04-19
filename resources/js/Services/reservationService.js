import axios from 'axios';

export async function submitReservation(data) {
    try {
        // Llamada centralizada al endpoint de reservas.
        const response = await axios.post('/reservations', data);

        return {
            success: true,
            data: response.data,
            errors: {},
        };
    } catch (error) {
        if (error.response?.status === 422) {
            return {
                success: false,
                data: null,
                errors: error.response.data.errors ?? {
                    general: [error.response.data.message ?? 'Error de validación.'],
                },
            };
        }

        throw error;
    }
}

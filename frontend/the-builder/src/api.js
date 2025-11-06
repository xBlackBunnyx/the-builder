import axios from 'axios';
import { tr } from 'vuetify/locale';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

//Exportar las funciones que vamos a necesitar en frontend
export const calculateScore = async (frontendData) => {
    try {
        const response = await api.post('/calculate-score', frontendData);
        return response.data;
    } catch (error) {
        console.error('Error calculating score: ', error);
        throw error;
    }
};


export default api;
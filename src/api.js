import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

//Here we export the functions to the frontend
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
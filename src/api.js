import axios from 'axios';

const API_BASE_URL = 'https://the-builder-wx6f.onrender.com/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

//Here we export the functions to the frontend
export const calculateScore = async (frontendData) => {
    try {
        console.log("The issue is here");
        const response = await api.post('/calculate-score', frontendData);
        return response.data;
    } catch (error) {
        console.error('Error calculating score: ', error);
        throw error;
    }
};

export default api;
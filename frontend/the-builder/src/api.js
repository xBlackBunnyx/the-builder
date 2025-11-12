import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

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

export const theTest = async () => {
    try {
        console.log("PONG");
        axios({method:'post', url: API_BASE_URL + '/api/testing'});
        // await api.post('/api/testing');
    } catch (error) {
        console.error('Error calculating score: ', error);
        throw error;
    }
};

export default api;
import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
});

export const fetchHelloWorld = async () => {
    const response = await api.get('/hello/');
    return response.data;
};

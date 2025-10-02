import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/', 
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(
    config => {
        const authTokenString = localStorage.getItem('authToken');
        if (authTokenString) {
            const authToken = JSON.parse(authTokenString);
            const token = authToken.access;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;
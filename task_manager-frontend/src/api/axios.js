// taskmanager-frontend/src/api/axios.js

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/', // Base URL for Django API
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptor to attach the JWT token to every request
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
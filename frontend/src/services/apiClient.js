import axios from 'axios';
import { env } from '../config/env.js';
import { ApiError, NetworkError, UnauthorizedError } from './errors.js';

function readCookie(name) {
    const match = document.cookie.split('; ').find((c) => c.startsWith(`${name}=`));
    return match ? decodeURIComponent(match.split('=')[1]) : null;
}

export const apiClient = axios.create({
    baseURL: env.apiBaseUrl,
    timeout: 15000,
    withCredentials: true,
    headers: { Accept: 'application/json' },
});

apiClient.interceptors.request.use((config) => {
    const method = (config.method || 'get').toLowerCase();
    if (method !== 'get') {
        const token = readCookie('XSRF-TOKEN');
        if (token) config.headers['X-XSRF-TOKEN'] = token;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error.response) return Promise.reject(new NetworkError());
        const { status, data } = error.response;
        if (status === 401) return Promise.reject(new UnauthorizedError());
        return Promise.reject(
            new ApiError(data?.message || 'Something went wrong. Please try again.', {
                status,
                code: data?.code || 'UNKNOWN',
                fieldErrors: data?.fieldErrors || [],
            })
        );
    }
);
// src/shared/api/axios.ts
import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://89.111.170.181:7156/api/',
    headers: { 'Content-Type': 'application/json' },
    // при необходимости: timeout: 10000,
});

// Пример перехватчика (опционально, под авторизацию/логи)
const isServer = typeof window === 'undefined';
api.interceptors.request.use(async (config) => {
    if (isServer) {
        // пример: прокинуть cookie с сервера, если нужно
        // const { cookies } = await import('next/headers');
        // const token = cookies().get('token')?.value;
        // if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

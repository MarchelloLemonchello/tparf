// src/shared/api/axios.ts
import axios from 'axios';

export const api = axios.create({
    baseURL:  process.env.NEXT_PUBLIC_API_BASE_URL,
    // при необходимости: timeout, headers, withCredentials и т.п.
});

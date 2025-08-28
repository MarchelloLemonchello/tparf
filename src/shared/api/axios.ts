// src/shared/api/axios.ts
import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://89.111.170.181:7156/api/',
    // при необходимости: timeout, headers, withCredentials и т.п.
});

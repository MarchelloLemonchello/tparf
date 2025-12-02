// src/shared/api/axios.ts
import axios from 'axios';

export const api = axios.create({
    baseURL:  'http://90.156.135.19:7156/api/',
    // при необходимости: timeout, headers, withCredentials и т.п.
});

// src/shared/api/services/auth.ts
import { api } from '@/shared/api/axios';

// Типы
export type LoginPayload = { email: string; password: string };
export type LoginResponse = { token: string };

// Типы для регистрации
export type RegisterPayload = {
    email: string;
    password: string;
    companyName: string;  // новое поле вместо firstName/lastName
    inn: string;          // новое поле
};

export type RegisterResponse = {
    token: string;  // обязательно поле token
};


export type CartProduct = {
    id: string;
    name: string;
    sku: string;
    price: number;
    currencyCode: string;
    brandName?: string;
    images?: { imageUrl: string }[];
};
export type CartItem = {
    id: string;
    product: CartProduct;
    quantity: number;
    price: number;
    totalPrice: number;
};
export type CartResponse = {
    id: string;
    items: CartItem[];
    totalAmount: number;
    createdAt: string;
};

// POST /auth/login — авторизация
export async function login(payload: LoginPayload): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>('auth/login', payload);
    return data;
}

// POST /auth/register — регистрация
export async function register(payload: RegisterPayload): Promise<RegisterResponse> {
    const { data } = await api.post<RegisterResponse>('auth/register', payload);
    return data;
}

// GET /cart — получить корзину (требует токен)
export async function getCart(token: string): Promise<CartResponse> {
    const { data } = await api.get<CartResponse>('cart', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
}

export type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    emailConfirmed: boolean;
};

export async function fetchMeServer(token: string): Promise<User> {
    const { data } = await api.get<User>('auth/me', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
}

export async function logout(): Promise<void> {
    await api.post('auth/logout');
}
// src/shared/api/services/auth.ts
import { api } from '@/shared/api/axios';

// Типы
export type LoginPayload = { email: string; password: string };
export type LoginResponse = { token: string };

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
    unitPrice: number;
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

// GET /cart — получить корзину (требует токен)
export async function getCart(token: string): Promise<CartResponse> {
    const { data } = await api.get<CartResponse>('cart', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
}

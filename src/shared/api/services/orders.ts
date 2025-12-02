// src/shared/api/services/orders.ts
import { api } from '@/shared/api/axios';

export type OrderItemImage = {
    id: string;
    imageUrl: string;
    isMain: boolean;
    sortOrder: number;
};

export type OrderItem = {
    id: string;
    productId: string;
    productName: string | null;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    currencyCode: string;
    brandId: string;
    brandName: string;
    images: OrderItemImage[];
};

export type OrderStatus = 1 | 2 | 3 | 4 | 5; // 1=ожидание, 2=обработка, 3=отправлено, 4=доставлено, 5=отменено

export type Order = {
    id: string;
    orderNumber: string;
    status: OrderStatus;
    totalAmount: number;
    items: OrderItem[];
    updatedAt: string;
    createdAt: string;
};

export type OrdersResponse = {
    items: Order[];
    totalCount: number;
    page: number;
    pageSize: number;
};

export async function getOrders(token: string): Promise<OrdersResponse> {
    const { data } = await api.get<OrdersResponse>('orders', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
}

export async function createOrderFromCart(token: string): Promise<Order> {
    const { data } = await api.post<Order>('orders/from-cart', {}, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
}
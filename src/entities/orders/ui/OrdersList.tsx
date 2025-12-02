// src/entities/orders/ui/OrdersList.tsx
'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Order } from '@/shared/api/services/orders';
import OrderItem from './OrderItem';

interface OrdersListProps {
    orders: Order[];
}

const STATUS_LABELS: Record<number, string> = {
    1: 'Ожидание',
    2: 'Обработка',
    3: 'Отправлено',
    4: 'Доставлено',
    5: 'Отменено'
};

const STATUS_COLORS: Record<number, string> = {
    1: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    2: 'bg-blue-100 text-blue-800 border-blue-200',
    3: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    4: 'bg-green-100 text-green-800 border-green-200',
    5: 'bg-red-100 text-red-800 border-red-200'
};

export default function OrdersList({ orders }: OrdersListProps) {
    return (
        <div className="space-y-4">
            {orders.map((order) => (
                <OrderItem key={order.id} order={order} />
            ))}
        </div>
    );
}

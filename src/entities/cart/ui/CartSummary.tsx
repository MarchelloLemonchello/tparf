// src/entities/cart/ui/CartSummary.tsx
import React from 'react';

interface Props {
    totalAmount: number;
    currencyCode?: string;
}

export default function CartSummary({ totalAmount, currencyCode = 'RUB' }: Props) {
    return (
        <div className="mt-6 flex items-center justify-between border-t pt-4">
            <div className="text-gray-600">Сумма заказа</div>
            <div className="text-xl font-bold">{totalAmount.toLocaleString('ru-RU')} {currencyCode}</div>
        </div>
    );
}

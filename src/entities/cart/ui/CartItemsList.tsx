// src/entities/cart/ui/CartItemsList.tsx
'use client';

import React from 'react';
import CartItem from './CartItem';
import type { CartItemType } from '@/shared/store/useCartStore';

interface CartItemsListProps {
    items: CartItemType[];
    token: string;
}

export default function CartItemsList({ items, token }: CartItemsListProps) {
    return (
        <div className="space-y-4"> {/* Вертикальный список */}
            {items.map((item) => (
                <CartItem key={item.id} item={item} token={token} />
            ))}
        </div>
    );
}

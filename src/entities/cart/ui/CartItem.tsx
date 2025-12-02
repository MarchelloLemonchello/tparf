'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { updateCartItem, removeFromCart, getCart } from '@/shared/api/services/cart';
import { useCartStore } from '@/shared/store/useCartStore';
import { CartItemDeleteButton } from '@/shared/ui/CartItemDeleteButton';
import { toast } from 'sonner';
import type { CartItemType } from '@/shared/store/useCartStore';

interface Props {
    item: CartItemType;
    token: string;
}

export default function CartItem({ item, token }: Props) {
    const [quantity, setQuantity] = useState(item.quantity);
    const [loading, setLoading] = useState(false);

    const removeItem = useCartStore((state) => state.removeItem);
    const updateQuantity = useCartStore((state) => state.updateQuantity);

    const mainImage = item.images.find((i) => i.isMain)?.imageUrl ?? item.images[0]?.imageUrl;

    async function handleQuantityChange(newQuantity: number) {
        setLoading(true);

        try {
            // Если пытаемся установить 0 или меньше → удаляем товар
            if (newQuantity <= 0) {
                await removeFromCart(token, item.productId);
                removeItem(item.productId);
                toast.success('Товар удален из корзины');
                return;
            }

            // Обычное обновление количества
            await updateCartItem(token, item.productId, newQuantity);
            updateQuantity(item.productId, newQuantity);
            setQuantity(newQuantity);
            toast.success('Количество обновлено');
        } catch (err) {
            console.error('Ошибка:', err);
            toast.error('Ошибка при изменении количества');
            setQuantity(item.quantity);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="relative rounded border border-[#DDDDDD] p-4 bg-white flex gap-4 group">
            {/* Кнопка удаления в правом верхнем углу */}
            <CartItemDeleteButton productId={item.productId} token={token} />

            {mainImage && (
                <img
                    src={mainImage}
                    alt={item.productName}
                    className="w-24 h-24 object-cover rounded"
                />
            )}

            <div className="flex-1">
                <div className="font-medium text-blue-600 hover:underline">
                    <Link href={`/product/${item.productId}`}>
                        {item.productName}
                    </Link>
                </div>
                <div className="text-sm text-gray-500">
                    Артикул: {item.productId} · {item.brandName ?? ''}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                    Цена за ед.: {item.price.toLocaleString('ru-RU')} {item.currencyCode}
                </div>
                <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                        Количество:
                        <button
                            onClick={() => handleQuantityChange(quantity - 1)}
                            className="w-8 h-8 rounded border px-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors flex items-center justify-center"
                            disabled={loading}
                        >
                            −
                        </button>
                        <span className="w-10 text-center font-medium bg-gray-100 rounded px-2 py-1">
                            {quantity}
                        </span>
                        <button
                            onClick={() => handleQuantityChange(quantity + 1)}
                            className="w-8 h-8 rounded border px-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors flex items-center justify-center"
                            disabled={loading}
                        >
                            +
                        </button>
                    </span>
                    <span className="font-semibold text-gray-800">
                        Итого: {(item.price * quantity).toLocaleString('ru-RU')} {item.currencyCode}
                    </span>
                </div>
            </div>
        </div>
    );
}

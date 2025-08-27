// src/entities/product/ui/ProductCard.tsx
'use client';
import clsx from 'clsx';
import { ImageWithFallback } from '@/shared/ui/image/ImageWithFallback';

export type ProductCardProps = {
    id: string;               // идентификатор товара [attached_file:1]
    name: string;             // название товара [attached_file:1]
    price: number;            // цена [attached_file:1]
    currencyCode: string;     // код валюты (например, RUB) [attached_file:1]
    imageUrl?: string;        // URL основного изображения товара [attached_file:1]
    brandName?: string;       // название бренда (PIUSI и т.п.) [attached_file:1]
    className?: string;       // дополнительные CSS-классы (настраиваемый внешний вид) [web:102][web:103]
};

export function ProductCard({ name, price, currencyCode, imageUrl, brandName, className }: ProductCardProps) {
    return (
        <div className={clsx('rounded border p-4 bg-white hover:shadow transition', className)}>
            <div className="aspect-square relative mb-3 overflow-hidden rounded">
                <ImageWithFallback
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-contain"
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw"
                />
            </div>
            <div className="text-sm text-gray-500 mb-1">{brandName}</div>
            <div className="font-medium mb-2 line-clamp-2">{name}</div>
            <div className="text-blue-600 font-semibold">
                {price.toLocaleString('ru-RU')} {currencyCode}
            </div>
        </div>
    );
}

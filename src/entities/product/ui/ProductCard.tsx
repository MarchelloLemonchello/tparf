// src/entities/product/ui/ProductCard.tsx
'use client';
import Link from 'next/link';
import clsx from 'clsx';
import { ImageWithFallback } from '@/shared/ui/image/ImageWithFallback';

export type ProductCardProps = {
    id: string;
    name: string;
    price: number;
    currencyCode: string;
    imageUrl?: string;
    brandName?: string;
    className?: string;
    hrefName?: string; // ссылка, используемая для клика по названию
};

export function ProductCard({
                                id,
                                name,
                                price,
                                currencyCode,
                                imageUrl,
                                brandName,
                                className,
                                hrefName,
                            }: ProductCardProps) {
    const nameHref = hrefName ?? `/product/${id}`;

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

            {brandName && <div className="text-sm text-gray-500 mb-1">{brandName}</div>}

            {/* Название товара — ссылка на страницу продукта */}
            <h3 className="font-medium mb-2 line-clamp-2">
                <Link href={nameHref} className="hover:underline">
                    {name}
                </Link>
            </h3>

            <div className="text-blue-600 font-semibold">
                {price.toLocaleString('ru-RU')} {currencyCode}
            </div>
        </div>
    );
}

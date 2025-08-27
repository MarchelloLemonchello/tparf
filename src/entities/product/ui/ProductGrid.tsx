// src/entities/product/ui/ProductGrid.tsx
'use client';
import { ProductCard, ProductCardProps } from './ProductCard';

export type ProductGridItem = ProductCardProps;

export function ProductGrid({ items }: { items: ProductGridItem[] }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((it) => (
                <ProductCard key={it.id} {...it} />
            ))}
        </div>
    );
}

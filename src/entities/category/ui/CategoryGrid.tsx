// src/entities/category/ui/CategoryGrid.tsx
'use client';
import { CategoryItem } from './CategoryItem';

export type CategoryGridItem = { id: string; name: string; childrenCount?: number };

export function CategoryGrid({
                                 items,
                                 parentLevel,
                             }: {
    items: CategoryGridItem[];
    parentLevel: number;
}) {
    const gridClass =
        parentLevel === 0
            ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3'
            : 'grid gap-3 sm:grid-cols-3 lg:grid-cols-4';

    return (
        <div className={gridClass}>
            {items.map((it) => (
                <CategoryItem
                    key={it.id}
                    id={it.id}
                    name={it.name}
                    parentLevel={parentLevel}
                    childrenCount={it.childrenCount}
                />
            ))}
        </div>
    );
}

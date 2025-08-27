// src/entities/category/ui/CategoryItem.tsx
'use client';
import { CategoryCard } from './CategoryCard';
import { CategoryCardCompact } from './CategoryCardCompact';

export type CategoryItemProps = {
    id: string;
    name: string;
    parentLevel: number; // уровень узла, чьих детей показываем
    childrenCount?: number;
};

export function CategoryItem({ id, name, parentLevel, childrenCount }: CategoryItemProps) {
    // Крупная карточка только на корне (дети корневой категории)
    if (parentLevel === 0) {
        return (
            <CategoryCard
                id={id}
                name={name}
                subtitle={typeof childrenCount === 'number' ? `Подкатегорий: ${childrenCount}` : undefined}
            />
        );
    }
    // Начиная с уровня 1 — компактная карточка
    return <CategoryCardCompact id={id} name={name} />;
}

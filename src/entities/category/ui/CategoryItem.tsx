'use client';
import { CategoryCard } from './CategoryCard';
import { CategoryCardCompact } from './CategoryCardCompact';

export type CategoryItemProps = {
    id: string;
    name: string;
    parentLevel: number;
    childrenCount?: number;
    imageUrl?: string | null; // добавлено
};

export function CategoryItem({ id, name, parentLevel, childrenCount, imageUrl }: CategoryItemProps) {
    if (parentLevel === 0) {
        return (
            <CategoryCard
                id={id}
                name={name}
                subtitle={typeof childrenCount === 'number' ? `Подкатегорий: ${childrenCount}` : undefined}
                imageUrl={imageUrl}
            />
        );
    }
    return <CategoryCardCompact id={id} name={name} imageUrl={imageUrl} />;
}

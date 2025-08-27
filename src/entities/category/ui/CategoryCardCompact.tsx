// src/entities/category/ui/CategoryCardCompact.tsx
'use client';
import Link from 'next/link';
import clsx from 'clsx';

export type CategoryCardCompactProps = {
    id: string;
    name: string;
    href?: string;
    className?: string;
};

export function CategoryCardCompact({ id, name, href, className }: CategoryCardCompactProps) {
    const to = href ?? `/catalog/${id}`;
    return (
        <Link
            href={to}
            className={clsx(
                'rounded border px-3 py-2 hover:bg-gray-50 transition bg-white',
                'text-sm',
                className
            )}
            title={name}
        >
            <span className="line-clamp-2">{name}</span>
        </Link>
    );
}

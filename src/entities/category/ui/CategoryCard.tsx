// src/entities/category/ui/CategoryCard.tsx
'use client';
import Link from 'next/link';
import clsx from 'clsx';

export type CategoryCardProps = {
    id: string;
    name: string;
    href?: string;
    subtitle?: string;
    className?: string;
};

export function CategoryCard({ id, name, href, subtitle, className }: CategoryCardProps) {
    const to = href ?? `/catalog/${id}`;
    return (
        <Link
            href={to}
            className={clsx(
                'rounded-lg border p-5 hover:shadow-md transition bg-white',
                'min-h-[116px] flex flex-col justify-center',
                className
            )}
        >
            <div className="text-base font-semibold">{name}</div>
            {subtitle && <div className="mt-1 text-xs text-gray-500">{subtitle}</div>}
        </Link>
    );
}

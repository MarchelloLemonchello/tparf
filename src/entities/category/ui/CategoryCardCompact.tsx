'use client';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

export type CategoryCardCompactProps = {
    id: string;
    name: string;
    href?: string;
    imageUrl?: string | null; // добавлено
    className?: string;
};

export function CategoryCardCompact({ id, name, href, imageUrl, className }: CategoryCardCompactProps) {
    const to = href ?? `/catalog/${id}`;
    const src = imageUrl || '/placeholder.png';
    return (
        <Link
            href={to}
            className={clsx(
                'rounded border border-[#DDDDDD] bg-white text-[#767676]',
                'p-3 flex items-center gap-3',
                'transition-transform transition-colors duration-200 ease-out hover:scale-[1.02] hover:border-[#646464]',
                className
            )}
            title={name}
        >
            <div className="relative shrink-0 w-12 h-12 overflow-hidden rounded border border-[#DDDDDD] bg-white">
                <Image src={src} alt={name} fill className="object-contain" sizes="48px" />
            </div>
            <span className="text-sm line-clamp-2">{name}</span>
        </Link>
    );
}

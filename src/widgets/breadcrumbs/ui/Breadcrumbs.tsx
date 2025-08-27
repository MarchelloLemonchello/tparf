// src/widgets/breadcrumbs/ui/Breadcrumbs.tsx
'use client';

import Link from 'next/link';
import { CategoryCrumb } from '@/entities/category/model/types';

type Props = {
    crumbs: CategoryCrumb[]; // [{id, title}] из node.pathItems
    className?: string;
};

export function Breadcrumbs({ crumbs, className }: Props) {
    // Формируем полный список: "Каталог" + элементы pathItems
    const fullCrumbs = [
        { id: '', title: 'Каталог', href: '/catalog' }, // корень каталога
        ...crumbs.map((c) => ({
            id: c.id,
            title: c.title,
            href: `/catalog/${c.id}`, // абсолютный путь по id
        })),
    ];

    return (
        <nav aria-label="breadcrumbs" className={className}>
            <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                {fullCrumbs.map((c, i) => {
                    const isLast = i === fullCrumbs.length - 1;
                    return (
                        <li key={`${c.id || 'root'}-${i}`} className="flex items-center">
                            {isLast ? (
                                <span className="font-medium">{c.title}</span>
                            ) : (
                                <Link href={c.href} className="hover:underline">
                                    {c.title}
                                </Link>
                            )}
                            {!isLast && <span className="mx-2 select-none text-gray-400">{'>'}</span>}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

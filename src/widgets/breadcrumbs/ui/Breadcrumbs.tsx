// src/widgets/breadcrumbs/ui/Breadcrumbs.tsx
'use client';

import Link from 'next/link';
import { CategoryCrumb } from '@/entities/category/model/types';
import { buildCategoryPathFromCrumbs, catalogRootPath } from '@/shared/lib/routing';
import clsx from 'clsx';

type Props = {
    crumbs: CategoryCrumb[]; // массив от корня к текущему уровню
    className?: string;
};

export function Breadcrumbs({ crumbs, className }: Props) {
    // Собираем элементы: [Каталог] + переданные крошки
    const fullCrumbs = [
        { id: '', title: 'Каталог', href: catalogRootPath },
        ...crumbs.map((c, idx) => {
            const path = buildCategoryPathFromCrumbs(crumbs.slice(0, idx + 1));
            return { id: c.id, title: c.title, href: path };
        }),
    ];

    return (
        <nav aria-label="breadcrumbs" className={clsx('text-sm text-gray-600', className)}>
            <ol className="flex flex-wrap items-center gap-2">
                {fullCrumbs.map((c, i) => {
                    const isLast = i === fullCrumbs.length - 1;
                    return (
                        <li key={`${c.title}-${i}`} className="flex items-center">
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

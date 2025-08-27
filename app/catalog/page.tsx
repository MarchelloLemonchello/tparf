// app/catalog/page.tsx
import Link from 'next/link';
import { fetchRootCategories } from '@/shared/api/services/categories';

export const revalidate = 300; // ISR: переиспользовать кеш 5 минут, при желании [8]

export default async function CatalogRootPage() {
    const roots = await fetchRootCategories();

    return (
        <section className="mx-auto max-w-7xl px-4 py-8">
            <h1 className="text-2xl font-semibold mb-6">Каталог</h1>

            {roots.length === 0 ? (
                <p className="text-gray-600">Нет корневых категорий.</p>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {roots.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/catalog/${cat.id}`}
                            className="rounded border p-4 hover:shadow"
                        >
                            <div className="font-medium mb-1">{cat.name}</div>
                            {cat.children && cat.children.length > 0 && (
                                <div className="text-xs text-gray-500">
                                    Подкатегорий: {cat.children.length}
                                </div>
                            )}
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
}

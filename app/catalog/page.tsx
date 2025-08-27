// app/catalog/page.tsx
import { fetchRootCategories } from '@/shared/api/services/categories';
import { CategoryGrid } from '@/entities/category/ui/CategoryGrid';

export const revalidate = 300;

export default async function CatalogRootPage() {
    const roots = await fetchRootCategories();
    const items = roots.map((cat) => ({
        id: cat.id,
        name: cat.name,
        childrenCount: cat.children?.length ?? undefined,
        imageUrl: cat.logoUrl ?? null, // добавлено
    }));

    return (
        <section className="mx-auto max-w-7xl px-4 py-8">
            <h1 className="text-2xl font-semibold mb-6">Каталог</h1>
            <CategoryGrid items={items} parentLevel={0} />
        </section>
    );
}

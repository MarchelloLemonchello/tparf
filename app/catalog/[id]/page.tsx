// app/catalog/[id]/page.tsx
import { notFound } from 'next/navigation';
import { fetchCategoryById } from '@/shared/api/services/categories';
import { fetchProductsByCategoryId } from '@/shared/api/services/products';
import { Breadcrumbs } from '@/widgets/breadcrumbs/ui/Breadcrumbs';
import { CategoryGrid } from '@/entities/category/ui/CategoryGrid';
import { ProductFilters } from '@/widgets/product-filters/ui/ProductFilters';
import { ProductGrid } from '@/entities/product/ui/ProductGrid';

export const revalidate = 300;

export default async function CategoryByIdPage({ params }: { params: { id: string } }) {
    let node;
    try {
        node = await fetchCategoryById(params.id);
    } catch (e: any) {
        if (e?.response?.status === 404) notFound();
        throw e;
    }

    const crumbs = node.pathItems.map((p) => ({ id: p.id, title: p.name }));

    const categoryItems = node.children.map((child) => ({
        id: child.id,
        name: child.name,
        childrenCount: child.children?.length ?? undefined,
    }));

    // ИЗМЕНЕНО: товары запрашиваются уже с уровня 1
    let productsData = null as Awaited<ReturnType<typeof fetchProductsByCategoryId>> | null;
    if (node.level >= 1) {
        productsData = await fetchProductsByCategoryId(node.id, { page: 1, pageSize: 20 });
    }

    const productItems =
        productsData?.items.map((p) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            currencyCode: p.currencyCode,
            imageUrl: p.images?.find((i) => i.isMain)?.imageUrl,
            brandName: p.brandName,
        })) ?? [];

    return (
        <section className="mx-auto max-w-7xl px-4 py-8">
            <Breadcrumbs crumbs={crumbs} className="mb-6" />
            <h1 className="text-2xl font-semibold mb-4">{node.name}</h1>

            {categoryItems.length > 0 && (
                <>
                    <h2 className="text-lg font-medium mb-3">Подкатегории</h2>
                    {/* parentLevel равен уровню текущего узла */}
                    <CategoryGrid items={categoryItems} parentLevel={node.level} />
                </>
            )}

            {/* ИЗМЕНЕНО: секция товаров показывается с уровня 1 */}
            {node.level >= 1 && (
                <>
                    <div className="mt-8">
                        <ProductFilters />
                    </div>
                    <div className="mt-4">
                        {productItems.length > 0 ? (
                            <ProductGrid items={productItems} />
                        ) : (
                            <p className="text-gray-600">Товары не найдены.</p>
                        )}
                    </div>
                </>
            )}
        </section>
    );
}

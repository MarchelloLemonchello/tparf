// app/catalog/[id]/page.tsx
import { notFound } from 'next/navigation';
import { fetchCategoryById } from '../../../src/shared/api/services/categories';
import { fetchProductsByCategoryId } from '../../../src/shared/api/services/products';
import { Breadcrumbs } from '../../../src/widgets/breadcrumbs/ui/Breadcrumbs';
import { CategoryGrid } from '../../../src/entities/category/ui/CategoryGrid';
import { ProductGrid } from '../../../src/entities/product/ui/ProductGrid';
import { Pagination } from '../../../src/widgets/pagination/ui/Pagination';

export const revalidate = 300;

// ✅ Правильная типизация для Next.js 15+
interface PageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ Page?: string; PageSize?: string }>;
}

export default async function CategoryByIdPage({ params, searchParams }: PageProps) {
    // ✅ Await для params и searchParams
    const { id } = await params;
    const search = await searchParams;

    let node;
    try {
        node = await fetchCategoryById(id); // ✅ используем id вместо params.id
    } catch (e: unknown) {
        // ✅ Правильная типизация ошибки
        if (e && typeof e === 'object' && 'response' in e) {
            const error = e as { response?: { status: number } };
            if (error.response?.status === 404) notFound();
        }
        throw e;
    }

    const crumbs = node.pathItems.map((p) => ({ id: p.id, title: p.name }));

    const categoryItems = node.children.map((child) => ({
        id: child.id,
        name: child.name,
        childrenCount: child.children?.length ?? undefined,
        imageUrl: child.logoUrl ?? null,
    }));

    // ✅ Читаем пагинацию из search (не searchParams)
    const page = Number(search.Page ?? 1);
    const pageSize = Number(search.PageSize ?? 20);

    // Товары с уровня 1 и выше
    let productsData = null as Awaited<ReturnType<typeof fetchProductsByCategoryId>> | null;
    if (node.level >= 1) {
        productsData = await fetchProductsByCategoryId(node.id, { page, pageSize });
    }

    const productItems =
        productsData?.items.map((p) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            currencyCode: p.currencyCode,
            imageUrl: p.images?.find((i) => i.isMain)?.imageUrl || p.images?.[0]?.imageUrl,
            brandName: p.brandName,
        })) ?? [];

    const totalCount = productsData?.totalCount ?? 0;

    return (
        <section className="mx-auto max-w-7xl px-4 py-8">
            <Breadcrumbs crumbs={crumbs} className="mb-6" />
            <h1 className="text-2xl font-semibold mb-4">{node.name}</h1>

            {categoryItems.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-lg font-medium mb-3">Подкатегории</h2>
                    <CategoryGrid items={categoryItems} parentLevel={node.level} />
                </div>
            )}

            {node.level >= 1 && (
                <>
                    <div className="flex">
                        {productItems.length > 0 ? (
                            <>
                                <ProductGrid items={productItems} />
                            </>
                        ) : (
                            <p className="text-gray-600">Товары не найдены.</p>
                        )}
                    </div>
                    <Pagination
                        basePath={`/catalog/${node.id}`}
                        page={page}
                        pageSize={pageSize}
                        totalCount={totalCount}
                    />
                </>
            )}
        </section>
    );
}

import { notFound } from 'next/navigation';
import { fetchProductById } from '@/shared/api/services/product';
import { Breadcrumbs } from '@/widgets/breadcrumbs/ui/Breadcrumbs';
import { ProductGallery } from '@/entities/product/ui/ProductGallery';
import { ProductInfo } from '@/entities/product/ui/ProductInfo';
import { ProductDescription } from '@/entities/product/ui/ProductDescription';
import { ProductCharacteristics } from '@/entities/product/ui/ProductCharacteristics';

export const revalidate = 300;

export default async function ProductPage({ params }: { params: { id: string } }) {
    let product;
    try {
        product = await fetchProductById(params.id);
    } catch (e: any) {
        if (e?.response?.status === 404) notFound();
        throw e;
    }

    // Берём крошки из первой категории (если принадлежит нескольким — можно выбрать наиболее релевантную)
    const categories = product.categories
    const pathItems = categories[0].pathItems ?? [];
    const baseCrumbs = pathItems.map((pi) => ({ id: pi.id, title: pi.name }));
    const crumbs = [...baseCrumbs, { id: product.id, title: product.name, isCurrent: true }];

    const images = product.images ?? [];
    const mainImage = images.find((i) => i.isMain)?.imageUrl ?? images[0]?.imageUrl;

    return (
        <section className="mx-auto max-w-7xl px-4 py-8">
            <Breadcrumbs crumbs={crumbs} className="mb-6" />

            <div className="grid gap-8 lg:grid-cols-2">
                <ProductGallery images={images} alt={product.name} />
                <ProductInfo
                    name={product.name}
                    sku={product.sku}
                    price={product.price}
                    currencyCode={product.currencyCode}
                    brandName={product.brandName}
                />
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-8">
                    <ProductDescription blocks={product.descriptions ?? []} />
                </div>
                <div className="space-y-8">
                    <ProductCharacteristics data={product.characteristics ?? {}} />
                </div>
            </div>
        </section>
    );
}

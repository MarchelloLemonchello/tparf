// app/catalog/[...slug]/page.tsx
import { notFound } from 'next/navigation';
import { fetchCategoryById } from '@/shared/api/services/categories';
import { Breadcrumbs } from '@/widgets/breadcrumbs/ui/Breadcrumbs';

type Props = { params: { slug?: string[] } };

export const revalidate = 300;

export default async function CategoryPage({ params }: Props) {
    const slug = params.slug ?? [];
    console.log(slug)
    if (slug.length === 0) {
        // Путь /catalog должен обрабатываться app/catalog/page.tsx
        notFound();
    }

    const id = slug[0]; // id текущей категории берём из первого сегмента
    try {
        const node = await fetchCategoryById(id);
        const crumbs = node.pathItems.map((pi) => ({ id: pi.id, title: pi.name }));

        return (
            <section className="mx-auto max-w-7xl px-4 py-8">
                <Breadcrumbs crumbs={crumbs} className="mb-6" />
                <h1 className="text-2xl font-semibold mb-4">{node.name}</h1>

                {node.children.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {node.children.map((child) => (
                            <a
                                key={child.id}
                                href={`/catalog/${child.id}`}
                                className="rounded border p-4 hover:shadow"
                            >
                                <div className="font-medium">{child.name}</div>
                            </a>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">Нет подкатегорий на этом уровне.</p>
                )}
            </section>
        );
    } catch (e: any) {
        // Если бэкенд вернул 404 — отдаём 404 страницу Next
        if (e?.response?.status === 404) {
            notFound();
        }
        throw e;
    }
}

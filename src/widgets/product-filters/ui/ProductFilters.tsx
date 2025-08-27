// src/widgets/product-filters/ui/ProductFilters.tsx
'use client';
// В дальнейшем здесь появятся контролы фильтрации и синхронизация с поисковыми параметрами
export function ProductFilters() {
    return (
        <aside className="mb-4 rounded border bg-white p-4">
            <div className="font-medium mb-2">Фильтры</div>
            <div className="text-sm text-gray-500">Здесь будут параметры фильтрации (бренд, цена и т.д.).</div>
        </aside>
    );
}

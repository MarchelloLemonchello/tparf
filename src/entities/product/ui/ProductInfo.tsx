'use client';

export function ProductInfo({
                                name,
                                sku,
                                price,
                                currencyCode,
                                brandName,
                            }: {
    name: string;
    sku: string;
    price: number;
    currencyCode: string;
    brandName?: string;
}) {
    return (
        <div className="space-y-3">
            <h1 className="text-2xl font-semibold">{name}</h1>
            <div className="text-sm text-gray-600">
                Бренд: <span className="font-medium">{brandName ?? '—'}</span>
            </div>
            <div className="text-sm text-gray-600">
                Артикул: <span className="font-medium">{sku}</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
                {price.toLocaleString('ru-RU')} {currencyCode}
            </div>
            <div className="flex gap-3">
                <button className="h-11 px-6 rounded-md bg-blue-600 text-white hover:bg-blue-700">
                    Добавить в корзину
                </button>
                <button className="h-11 px-6 rounded-md border hover:bg-gray-50">
                    Купить в 1 клик
                </button>
            </div>
        </div>
    );
}

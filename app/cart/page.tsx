// app/cart/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getCart } from '@/shared/api/services/auth';

export default async function CartPage() {
    const token = (await cookies()).get('auth_token')?.value;
    if (!token) {
        redirect('/auth/login');
    }

    try {
        const cart = await getCart(token!);

        return (
            <section className="mx-auto max-w-7xl px-4 py-8">
                <h1 className="text-2xl font-semibold mb-6">Корзина</h1>

                {cart.items.length === 0 ? (
                    <p className="text-gray-600">Корзина пуста.</p>
                ) : (
                    <div className="space-y-4">
                        {cart.items.map((item) => (
                            <div key={item.id} className="rounded border border-[#DDDDDD] p-4 bg-white">
                                <div className="flex items-start gap-4">
                                    <div className="flex-1">
                                        <div className="font-medium">{item.product.name}</div>
                                        <div className="text-sm text-gray-500">
                                            Артикул: {item.product.sku} · {item.product.brandName ?? ''}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500">Цена</div>
                                        <div className="font-semibold">
                                            {item.unitPrice.toLocaleString('ru-RU')} {item.product.currencyCode}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                                    <span>Количество: {item.quantity}</span>
                                    <span className="font-semibold text-gray-800">
                    Итого: {item.totalPrice.toLocaleString('ru-RU')} {item.product.currencyCode}
                  </span>
                                </div>
                            </div>
                        ))}

                        <div className="mt-6 flex items-center justify-between border-t pt-4">
                            <div className="text-gray-600">Сумма заказа</div>
                            <div className="text-xl font-bold">
                                {cart.totalAmount.toLocaleString('ru-RU')} {cart.items[0]?.product.currencyCode ?? 'RUB'}
                            </div>
                        </div>
                    </div>
                )}
            </section>
        );
    } catch (err: any) {
        // Если бэкенд ответил 401 — редирект на логин
        if (err?.response?.status === 401 || err?.response?.status === 403) {
            redirect('/auth/login');
        }
        throw err; // прочие ошибки — пусть упадут штатно
    }
}

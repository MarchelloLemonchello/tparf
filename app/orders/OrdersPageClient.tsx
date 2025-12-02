// app/orders/OrdersPageClient.tsx
'use client';

import HeaderNav from '@/widgets/layout/HeaderNav';

export default function OrdersPageClient({ token }: { token: string }) {
    return (
        <section className="mx-auto max-w-7xl px-4 py-8">
            <HeaderNav />
            <div className="mt-8">
                <p className="text-gray-600 text-lg">Здесь будут отображаться ваши заказы</p>
                {/* В будущем здесь будет список заказов */}
            </div>
        </section>
    );
}



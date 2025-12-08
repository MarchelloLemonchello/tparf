// app/orders/page.tsx
import { redirect } from 'next/navigation';
import { getUserFromCookie } from '@/shared/server/auth';
import { getOrders } from '@/shared/api/services/orders';
import OrdersPageClient from './OrdersPageClient';

export default async function OrdersPage() {
    const user = await getUserFromCookie();
    if (!user || !user.token) redirect('/auth/login');

    try {
        const orders = await getOrders(user.token);
        return <OrdersPageClient orders={orders} user={user} />;
    } catch (err: unknown) {
        if (err?.response?.status === 401 || err?.response?.status === 403) {
            redirect('/auth/login');
        }
        throw err;
    }
}


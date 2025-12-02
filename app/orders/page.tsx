// app/orders/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import OrdersPageClient from './OrdersPageClient';

export default async function OrdersPage() {
    const token = (await cookies()).get('auth_token')?.value;
    if (!token) redirect('/auth/login');

    return <OrdersPageClient token={token} />;
}
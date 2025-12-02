import { redirect } from 'next/navigation';
import { getCart } from '@/shared/api/services/cart'; // исправил путь
import CartPageClient from './CartPageClient';
import { getUserFromCookie } from '@/shared/server/auth';

export default async function CartPage() {
    const user = await getUserFromCookie();
    if (!user || !user.token) redirect('/auth/login');

    const token = user.token!; // теперь токен из user

    try {
        const cart = await getCart(token);
        return <CartPageClient cart={cart} user={user} />;
    } catch (err: any) {
        if (err?.response?.status === 401 || err?.response?.status === 403) {
            redirect('/auth/login');
        }
        throw err;
    }
}

// app/cart/page.tsx
import { redirect } from 'next/navigation';
import { getCart } from '@/shared/api/services/cart';
import CartPageClient from './CartPageClient';
import { getUserFromCookie } from '@/shared/server/auth';

export default async function CartPage() {
    const user = await getUserFromCookie();

    // ✅ Проверяем что user существует И имеет token
    if (!user) redirect('/auth/login');

    // ✅ Получаем токен из переменной окружения или другого источника
    // Если getUserFromCookie не возвращает token, получите его отдельно
    let token: string | undefined;

    // Вариант 1: Если user имеет token
    if ('token' in user && typeof user.token === 'string') {
        token = user.token;
    }

    // Вариант 2: Если токен в cookies (получить через API)
    if (!token) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}auth/me`, {
                headers: {
                    'Cookie': `auth_token=${getCookieValue('auth_token')}`
                }
            });
            if (!response.ok) redirect('/auth/login');
        } catch {
            redirect('/auth/login');
        }
        token = getCookieValue('auth_token');
    }

    if (!token) redirect('/auth/login');

    try {
        const cart = await getCart(token);
        return <CartPageClient cart={cart} user={user} />;
    } catch (err: unknown) {
        const error = err as Error & { response?: { status: number } };
        if (error.response?.status === 401 || error.response?.status === 403) {
            redirect('/auth/login');
        }
        throw err;
    }
}

// Вспомогательная функция
function getCookieValue(name: string): string | undefined {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : undefined;
}

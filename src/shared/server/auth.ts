import { cookies } from 'next/headers';
import { fetchMeServer, type User } from '@/shared/api/services/auth';

export async function getUserFromCookie(): Promise<User & {token?: string} | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    if (!token) return null;
    try {
        const user = await fetchMeServer(token);
        return { ...user, token };  // добавили токен в user
    } catch {
        return null;
    }
}

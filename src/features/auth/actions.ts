'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { ZodError } from 'zod';
import { loginSchema, registerSchema } from './validation';
import { register, login as loginApi } from '@/shared/api/services/auth';

export type RegisterState = { ok: boolean; errors?: Record<string, string>; message?: string };
export type LoginState = { ok: boolean; errors?: Record<string, string>; message?: string };

function isZodError(e: unknown): e is ZodError {
    return !!e && typeof e === 'object' && 'issues' in (e as Record<string, unknown>) && Array.isArray((e as Record<string, unknown>).issues);
}

function extractErrors(err: ZodError) {
    const errors: Record<string, string> = {};
    for (const i of err.issues) {
        const first = Array.isArray(i.path) ? i.path[0] : undefined;
        const key = typeof first === 'string' ? first : 'form';
        if (!errors[key]) errors[key] = i.message;
    }
    return errors;
}

export async function registerAction(_: RegisterState, formData: FormData): Promise<RegisterState> {
    let token: string | null = null;

    try {
        const parsed = registerSchema.pick({
            email: true,
            password: true,
            companyName: true,
            inn: true,
            confirm: true,
            consent: true,
        }).parse({
            email: formData.get('email'),
            password: formData.get('password'),
            companyName: formData.get('companyName'),
            inn: formData.get('inn'),
            confirm: formData.get('confirm'),
            consent: formData.get('consent') === 'on',
        });

        const res = await register({
            email: parsed.email,
            password: parsed.password,
            companyName: parsed.companyName,
            inn: parsed.inn,
        });
        token = res.token;

        const cookieStore = await cookies();
        cookieStore.set({
            name: 'auth_token',
            value: token,
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
        });

    } catch (err: unknown) {
        if (isZodError(err)) return { ok: false, errors: extractErrors(err) };
        return { ok: false, message: 'Ошибка сети или сервера. Повторите попытку.' };
    }

    redirect('/cart');
}

export async function loginAction(_: LoginState, formData: FormData): Promise<LoginState> {
    let token: string | null = null;

    try {
        const parsed = loginSchema.parse({
            email: formData.get('email'),
            password: formData.get('password'),
        });

        const res = await loginApi({ email: parsed.email, password: parsed.password });
        token = res.token;

        const cookieStore = await cookies();
        cookieStore.set({
            name: 'auth_token',
            value: token,
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
        });
    } catch (err: unknown) {
        // ✅ Исправлено: типизированный доступ к ошибке Axios без any
        if (err && typeof err === 'object' && 'response' in err) {
            const axiosError = err as { response?: { data?: string | { message?: string } } };
            const text =
                typeof axiosError.response?.data === 'string'
                    ? axiosError.response.data
                    : axiosError.response?.data?.message || '';
            return { ok: false, message: text || 'Не удалось выполнить вход. Проверьте email и пароль.' };
        }
        if (isZodError(err)) return { ok: false, errors: extractErrors(err) };
        return { ok: false, message: 'Ошибка сети или сервера. Повторите попытку.' };
    }

    redirect('/cart');
}

// src/features/auth/actions.ts
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { ZodError } from 'zod';
import { loginSchema, registerSchema } from './validation';
import { login as loginApi } from '@/shared/api/services/auth';

export type RegisterState = { ok: boolean; errors?: Record<string, string>; message?: string };
export type LoginState = { ok: boolean; errors?: Record<string, string>; message?: string };

function isZodError(e: unknown): e is ZodError {
    return !!e && typeof e === 'object' && 'issues' in (e as any) && Array.isArray((e as any).issues);
}
function extractErrors(err: ZodError) {
    const errors: Record<string, string> = {};
    for (const i of err.issues) {
        const first = Array.isArray(i.path) ? i.path[0] : undefined;
        const key = typeof first === 'string' ? (first as unknown as string) : 'form';
        if (!errors[key]) errors[key] = i.message;
    }
    return errors;
}

export async function registerAction(_: RegisterState, formData: FormData): Promise<RegisterState> {
    try {
        const parsed = registerSchema.parse({
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            company: formData.get('company'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirm: formData.get('confirm'),
            consent: formData.get('consent'),
        });
        // TODO: POST на ваш endpoint регистрации через сервис (если появится)
        return { ok: true, message: 'Регистрация успешна' };
    } catch (err: unknown) {
        if (isZodError(err)) return { ok: false, errors: extractErrors(err) };
        return { ok: false, message: 'Ошибка сети или сервера. Повторите попытку.' };
    }
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
    } catch (err: any) {
        if (err?.response) {
            const text =
                typeof err.response.data === 'string'
                    ? err.response.data
                    : err.response.data?.message || '';
            return { ok: false, message: text || 'Не удалось выполнить вход. Проверьте email и пароль.' };
        }
        if (isZodError(err)) return { ok: false, errors: extractErrors(err) };
        return { ok: false, message: 'Ошибка сети или сервера. Повторите попытку.' };
    }

    // Успешный кейс: выполняем редирект ВНЕ try/catch, чтобы не попасть в catch
    redirect('/cart');
}


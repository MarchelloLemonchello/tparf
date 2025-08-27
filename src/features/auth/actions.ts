// src/features/auth/actions.ts
'use server';

import type { ZodError, ZodIssue } from 'zod';
import { registerSchema, loginSchema } from './validation';

export type RegisterState = { ok: boolean; errors?: Record<string, string>; message?: string };
export type LoginState = { ok: boolean; errors?: Record<string, string>; message?: string };

export async function registerAction(
    _: RegisterState,
    formData: FormData
): Promise<RegisterState> {
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

        // TODO: запрос к бэкенду регистрации
        return { ok: true, message: 'Регистрация успешна' };
    } catch (err: unknown) {
        // Типобезопасная обработка Zod ошибок
        if (isZodError(err)) {
            const errors: Record<string, string> = {};
            for (const i of err.issues) {
                const key = (Array.isArray(i.path) && typeof i.path === 'string'
                    ? i.path
                    : 'form') as string;
                if (!errors[key]) errors[key] = i.message;
            }
            return { ok: false, errors };
        }
        return { ok: false, message: 'Неизвестная ошибка' };
    }
}

export async function loginAction(
    _: LoginState,
    formData: FormData
): Promise<LoginState> {
    try {
        const parsed = loginSchema.parse({
            email: formData.get('email'),
            password: formData.get('password'),
        });
        // TODO: запрос к бэкенду авторизации
        return { ok: true };
    } catch (err: unknown) {
        if (isZodError(err)) {
            const errors: Record<string, string> = {};
            for (const i of err.issues) {
                const key = (Array.isArray(i.path) && typeof i.path === 'string'
                    ? i.path
                    : 'form') as string;
                if (!errors[key]) errors[key] = i.message;
            }
            return { ok: false, errors };
        }
        return { ok: false, message: 'Неизвестная ошибка' };
    }
}

// Узкий type guard под ZodError
function isZodError(e: unknown): e is ZodError {
    return !!e && typeof e === 'object' && 'issues' in (e as any) && Array.isArray((e as any).issues);
}

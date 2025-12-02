'use client';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { registerAction, type RegisterState } from '../actions';
import { Button } from '@/shared/ui/button/ui/Button';
import { useState } from 'react';

const initialState: RegisterState = { ok: false };

export function RegisterForm() {
    const [state, formAction] = useFormState(registerAction, initialState);
    const [consentChecked, setConsentChecked] = useState(false);

    return (
        <>
            <form action={formAction} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm mb-1">
                            Имя
                        </label>
                        <input id="firstName" name="firstName" className="w-full rounded border p-2" />
                        {state.errors?.firstName && <p className="text-sm text-red-600">{state.errors.firstName}</p>}
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block text-sm mb-1">
                            Фамилия
                        </label>
                        <input id="lastName" name="lastName" className="w-full rounded border p-2" />
                        {state.errors?.lastName && <p className="text-sm text-red-600">{state.errors.lastName}</p>}
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm mb-1">
                        Email
                    </label>
                    <input type="email" id="email" name="email" className="w-full rounded border p-2" />
                    {state.errors?.email && <p className="text-sm text-red-600">{state.errors.email}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm mb-1">
                        Пароль
                    </label>
                    <input type="password" id="password" name="password" className="w-full rounded border p-2" />
                    {state.errors?.password && <p className="text-sm text-red-600">{state.errors.password}</p>}
                </div>
                <div>
                    <label htmlFor="confirm" className="block text-sm mb-1">
                        Повторите пароль
                    </label>
                    <input type="password" id="confirm" name="confirm" className="w-full rounded border p-2" />
                    {state.errors?.confirm && <p className="text-sm text-red-600">{state.errors.confirm}</p>}
                </div>

                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        id="consent"
                        name="consent"
                        onChange={(e) => setConsentChecked(e.target.checked)}
                    />
                    <span>Даю свое согласие на обработку персональных данных</span>
                </label>
                {state.errors?.consent && <p className="text-sm text-red-600">{state.errors.consent}</p>}

                {state.message && <p className="text-sm">{state.message}</p>}

                <Button type="submit" variant="primary" disabled={!consentChecked}>
                    Зарегистрироваться
                </Button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
                Уже есть аккаунт?{' '}
                <Link href="/auth/login" className="text-blue-600 hover:underline">
                    Войти
                </Link>
            </p>
        </>
    );
}

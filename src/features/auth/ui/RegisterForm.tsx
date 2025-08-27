'use client';

import { useFormState } from 'react-dom';
import { registerAction, type RegisterState } from '../actions';
import {Button} from "@/shared/ui/button/ui/Button";

const initialState: RegisterState = { ok: false };

export function RegisterForm() {
    const [state, formAction] = useFormState(registerAction, initialState);

    return (
        <form action={formAction} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm mb-1">Имя</label>
                    <input name="firstName" className="w-full rounded border p-2" />
                    {state.errors?.firstName && <p className="text-sm text-red-600">{state.errors.firstName}</p>}
                </div>
                <div>
                    <label className="block text-sm mb-1">Фамилия</label>
                    <input name="lastName" className="w-full rounded border p-2" />
                    {state.errors?.lastName && <p className="text-sm text-red-600">{state.errors.lastName}</p>}
                </div>
            </div>

            <div>
                <label className="block text-sm mb-1">Название компании</label>
                <input name="company" className="w-full rounded border p-2" />
                {state.errors?.company && <p className="text-sm text-red-600">{state.errors.company}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm mb-1">Номер телефона</label>
                    <input name="phone" className="w-full rounded border p-2" />
                    {state.errors?.phone && <p className="text-sm text-red-600">{state.errors.phone}</p>}
                </div>
                <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input type="email" name="email" className="w-full rounded border p-2" />
                    {state.errors?.email && <p className="text-sm text-red-600">{state.errors.email}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm mb-1">Используйте сильный пароль</label>
                    <input type="password" name="password" className="w-full rounded border p-2" />
                    {state.errors?.password && <p className="text-sm text-red-600">{state.errors.password}</p>}
                </div>
                <div>
                    <label className="block text-sm mb-1">Повторите пароль</label>
                    <input type="password" name="confirm" className="w-full rounded border p-2" />
                    {state.errors?.confirm && <p className="text-sm text-red-600">{state.errors.confirm}</p>}
                </div>
            </div>

            <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="consent" />
                Даю свое согласие на обработку персональных данных
            </label>
            {state.errors?.consent && <p className="text-sm text-red-600">{state.errors.consent}</p>}

            {state.message && <p className="text-sm">{state.message}</p>}

            <Button type="submit" variant="primary">
                Зарегистрироваться
            </Button>
        </form>
    );
}

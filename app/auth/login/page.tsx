import { LoginForm } from '@/features/auth/ui/LoginForm';

export const metadata = { title: 'Авторизация' };

export default function LoginPage() {
    return (
        <section className="mx-auto max-w-md px-4 py-10">
            <h1 className="text-2xl font-semibold mb-6">Вход в аккаунт</h1>
            <LoginForm />
        </section>
    );
}

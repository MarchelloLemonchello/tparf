import { RegisterForm } from '@/features/auth/ui/RegisterForm';

export const metadata = { title: 'Регистрация' };

export default function RegisterPage() {
    return (
        <section className="mx-auto max-w-2xl px-4 py-10">
            <h1 className="text-2xl font-semibold mb-6">Регистрация</h1>
            <RegisterForm />
        </section>
    );
}

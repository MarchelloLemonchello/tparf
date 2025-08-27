// src/widgets/header/ui/Header.tsx
'use client';
import Link from 'next/link';

export function Header() {
    return (
        <header className="border-b bg-white">
            <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
                <Link href="/" className="text-xl font-semibold">ИнструментыPro</Link>
                <nav className="flex gap-4">
                    <Link href="/catalog" className="hover:underline">Каталог</Link>
                    <Link href="/about" className="hover:underline">О компании</Link>
                    <Link href="/contacts" className="hover:underline">Контакты</Link>
                </nav>
            </div>
        </header>
    );
}

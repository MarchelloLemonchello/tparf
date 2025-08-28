// src/widgets/header/ui/Header.tsx
'use client';
import Link from 'next/link';
import {Button} from "@/shared/ui/button/ui/Button";
import s from './Header.module.css';

export function Header() {
    return (
        <header className={s.header}>
            <div className={s.inner}>
                <nav className={s.lc}>
                    <Link href="/" className="text-xl font-semibold mr-8"><img src={'/Logo.png'} alt={'Торогово промышленное агенство'}/></Link>
                    <Link className="inline-flex items-center justify-center h-10 px-6 rounded-md button-primary transition-colors" href={'/catalog'}>каталог</Link>
                </nav>
                <div className="flex justify-end items-center">
                <nav className={s.nav}>
                    <Link href="/about" className="hover:underline">О компании</Link>
                    <Link href="/contacts" className="hover:underline">Контакты</Link>
                    <Link href="/support" className="hover:underline">Поддержка</Link>
                </nav>
                <Button><Link href="/cart">Корзина</Link></Button>
                </div>
            </div>
        </header>
    );
}

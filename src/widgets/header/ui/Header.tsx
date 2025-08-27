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
                    <Button><Link href={'/catalog'}>каталог</Link></Button>
                </nav>

                <nav className={s.nav}>
                    <Link href="/about" className="hover:underline">О компании</Link>
                    <Link href="/contacts" className="hover:underline">Контакты</Link>
                    <Link href="/support" className="hover:underline">Поддержка</Link>
                </nav>
            </div>
        </header>
    );
}

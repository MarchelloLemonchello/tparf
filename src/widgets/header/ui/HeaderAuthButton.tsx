// src/widgets/header/ui/HeaderAuthButton.tsx
'use client';
import Link from 'next/link';
import { Button } from '@/shared/ui/button/ui/Button';
import { User } from './Header';

interface HeaderAuthButtonProps {
    user: User | null;
}

export function HeaderAuthButton({ user }: HeaderAuthButtonProps) {
    if (user) {
        return (
            <Button>
                <Link href="/cart">Корзина</Link>
            </Button>
        );
    }
    return (
        <Button>
            <Link href="/auth/login">Корзина2</Link>
        </Button>
    );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from '@/widgets/auth/ui/LogoutButton';

export default function HeaderNav() {
    const pathname = usePathname();

    return (
        <div className="flex justify-between items-center mb-6">
            <nav className="flex gap-8">
                <Link
                    href="/cart"
                    className={`text-2xl font-semibold hover:underline transition-colors ${
                        pathname === '/cart' ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
                    }`}
                >
                    Корзина
                </Link>
                <Link
                    href="/orders"
                    className={`text-2xl font-semibold hover:underline transition-colors ${
                        pathname === '/orders' ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
                    }`}
                >
                    Заказы
                </Link>
            </nav>
            <LogoutButton />
        </div>
    );
}

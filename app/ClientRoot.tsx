'use client';
import { useEffect } from 'react';
import { useUserStore } from '@/shared/store/useUserStore';

export function ClientRoot({ children }: { children: React.ReactNode }) {
    const fetchUser = useUserStore((state) => state.fetchUser);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return <>{children}</>;
}

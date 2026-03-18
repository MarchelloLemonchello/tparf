'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import {Button} from "@/shared/ui/button/ui/Button";

interface SearchInputProps {
    placeholder?: string;
    className?: string;
}

export const SearchInput = ({ placeholder = 'Поиск товаров...', className = '' }: SearchInputProps) => {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = query.trim();
        if (trimmed) {
            router.push(`/search?q=${encodeURIComponent(trimmed)}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`flex items-center ${className}`}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-2 border border-gray-500 rounded-l-md focus:outline-none focus:border-gray-400"
            />
            <Button
                type="submit"
                className="px-4 py-3 bg-gray-200 text-gray-700 rounded-r-md rounded-l-none hover:bg-gray-300 transition-colors flex items-center justify-center"
                aria-label="Найти"
            >
                <Image
                    src="/search-icon.svg"
                    alt="Поиск"
                    width={20}
                    height={20}
                />
            </Button>
        </form>
    );
};
// src/widgets/footer/ui/Footer.tsx
'use client';

export function Footer() {
    return (
        <footer className="border-t bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-gray-600 flex items-center justify-between">
                <p>© {new Date().getFullYear()} ИнструментыPro</p>
                <div className="flex gap-4">
                    <a href="/privacy" className="hover:underline">Политика</a>
                    <a href="/terms" className="hover:underline">Условия</a>
                </div>
            </div>
        </footer>
    );
}

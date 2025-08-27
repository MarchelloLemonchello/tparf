// app/layout.tsx
import type { Metadata } from 'next';
import { Header } from '@/widgets/header/ui/Header';
import { Footer } from '@/widgets/footer/ui/Footer';
import './globals.css';

export const metadata: Metadata = {
    title: 'ИнструментыPro — магазин инструментов',
    description: 'Интернет-магазин инструментов и оборудования для ремонта',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
        <body>
        <Header />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
        </body>
        </html>
    );
}

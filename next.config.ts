import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            // Существующие записи
            { protocol: 'https', hostname: 'petropump.ru', pathname: '/upload/**' },
            { protocol: 'http', hostname: 'fotobank.eltreco.ru', pathname: '/**' },
            { protocol: 'https', hostname: 'gate.skatpower.ru', pathname: '/**' },
            { protocol: 'https', hostname: 'sts-rf.ru', pathname: '/**' },
            { protocol: 'https', hostname: 'kedrweld.ru', pathname: '/**' },
            { protocol: 'https', hostname: 'cdn.ibot.by', pathname: '/**' },
            { protocol: 'https', hostname: 'dev.advanta-m.com', pathname: '/**' },
            { protocol: 'https', hostname: 'argut.net', pathname: '/upload/**' },
            { protocol: 'https', hostname: 'berger.store', pathname: '/**' },
            { protocol: 'http', hostname: 'championtool.ru', pathname: '/**' },
            // Добавляем недостающий домен
            { protocol: 'https', hostname: 'champion.ru', pathname: '/upload/**' },
            { protocol: 'https', hostname: 'farseer.su', pathname: '/**' },
            { protocol: 'https', hostname: 'yml.grmeh.ru', pathname: '/**' },
            { protocol: 'https', hostname: 'www.hightech-instrument.ru', pathname: '/**' },
            { protocol: 'https', hostname: 'opteltreco.ru', pathname: '/**' },
            { protocol: 'https', hostname: 'vsesvetodiody.ru', pathname: '/**' },
        ],
    },
};

export default nextConfig;
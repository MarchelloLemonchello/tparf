import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            new URL('https://petropump.ru/upload/**'),
        ],
    }
};

export default nextConfig;

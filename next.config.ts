import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mangadex.org',
            },
            {
                protocol: 'https',
                hostname: 'cmdxd98sb0x3yprd.mangadex.network',
            },
        ],
        localPatterns: [
            {
                pathname: '/api/image', // allow serving images from this API route
            },
        ],
        qualities: [25, 50, 75, 100],
    },

    output: 'standalone',
};

export default nextConfig;

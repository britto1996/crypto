/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    images: {
        unoptimized: true,
    },
    basePath: '/crypto',
    assetPrefix: '/crypto',
};

export default nextConfig;

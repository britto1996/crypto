const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: isProd ? 'export' : undefined,
    images: {
        unoptimized: true,
    },
    basePath: isProd ? '/crypto' : '',
    assetPrefix: isProd ? '/crypto' : '',
};

export default nextConfig;

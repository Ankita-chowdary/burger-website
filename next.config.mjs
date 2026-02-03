/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: "/burger",
    assetPrefix: "/burger/",
    images: {
        unoptimized: true,
    },
};

export default nextConfig;

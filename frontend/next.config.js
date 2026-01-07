/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    optimizeFonts: false,
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    images: {
        unoptimized: true,
        domains: ['localhost'],
    },
    async rewrites() {
        // Use BACKEND_URL for the proxy target, or default to 127.0.0.1:3000
        const backendUrl = process.env.BACKEND_URL || 'http://127.0.0.1:3000';
        return [
            {
                source: '/api/:path*',
                destination: `${backendUrl.replace(/\/$/, '')}/api/:path*`,
            },
        ];
    },
}

module.exports = nextConfig

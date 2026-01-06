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
        domains: ['localhost', 'arwaeduc.digima.cloud'],
    },
    async rewrites() {
        // Use BACKEND_URL for the proxy target, or default to localhost:4000
        // DO NOT use NEXT_PUBLIC_API_URL as it might point to the frontend itself (localhost:3000)
        const apiBase = process.env.BACKEND_URL || 'https://arwaeduc.digima.cloud';
        // Ensure we don't accidentally duplicate `/api` if NEXT_PUBLIC_API_URL already contains it
        const base = apiBase.endsWith('/api') ? apiBase.replace(/\/api$/, '') : apiBase;
        return [
            {
                source: '/api/:path*',
                destination: `${base}/api/:path*`,
            },
        ];
    },
}

module.exports = nextConfig

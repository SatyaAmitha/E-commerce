import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'plus.unsplash.com',
      'localhost',
      'picsum.photos',
      'placehold.co',
      'placekitten.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
  },
  typescript: {
    // Dangerously allow production builds to successfully complete even if your project has type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if your project has ESLint errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

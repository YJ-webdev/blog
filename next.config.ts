import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.coupangcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'www.youtube.com',
      },
      {
        protocol: 'https', // You need to specify HTTPS for Amazon images
        hostname: 'images-na.ssl-images-amazon.com', // Exact hostname for Amazon images
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  /* config options here */
  reactStrictMode: false,
};

export default nextConfig;

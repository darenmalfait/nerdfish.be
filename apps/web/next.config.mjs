// This will make sure the environment variables are validated at build time which will save a lot of time and headaches down the road.

import './src/env.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  swcMinify: true,
  images: {
    remotePatterns: [{hostname: 'assets.tina.io'}],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/rss.xml',
        destination: '/api/feed/rss',
      },
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
    ]
  },
}

export default nextConfig

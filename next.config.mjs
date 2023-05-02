// This will make sure the environment variables are validated at build time which will save a lot of time and headaches down the road.
import './env.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@nerdfish/ui'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
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

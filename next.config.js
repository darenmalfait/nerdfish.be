module.exports = {
  // workaround for next not supporting trailing slashes in paths
  trailingSlash: true,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  experimental: {
    appDir: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
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

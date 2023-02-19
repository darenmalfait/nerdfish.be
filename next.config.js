module.exports = {
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
        source: '/rss.xml',
        destination: '/api/feed/rss',
      },
      {
        source: '/',
        destination: '/home',
      },
      {
        source: '/admin',
        destination: '/admin/index.html',
      },

      // old website redirects
      {
        source: '/en',
        destination: '/',
      },
      {
        source: '/en/blog',
        destination: '/blog',
      },
      {
        source: '/en/wiki',
        destination: '/wiki',
      },
      {
        source: '/en/contact',
        destination: '/contact',
      },
      {
        source:
          '/en/blog/2022/01/a-kebab,-a-camel,-and-pascal-walked-into-a-codespace',
        destination:
          '/blog/2022/01/a-kebab-a-camel-and-pascal-walked-into-a-codespace',
      },
      {
        source:
          '/en/blog/2022/01/a-kebab,-a-camel,-and-pascal-walked-into-a-codespace',
        destination:
          '/blog/2022/01/a-kebab-a-camel-and-pascal-walked-into-a-codespace',
      },
      {
        source:
          '/en/blog/2022/01/frrrip-throwing-remix.run-into-the-mix-first-impressions',
        destination:
          '/blog/2022/01/frrrip-throwing-remix.run-into-the-mix-my-first-impressions',
      },
      {
        source: '/en/blog/2022/02/writing-the-perfect-git-commit-message',
        destination: '/blog/2022/02/writing-the-perfect-git-commit-message',
      },
      {
        source:
          '/en/blog/2022/02/keeping-up-to-date-with-the-latest-web-development-trends',
        destination:
          '/blog/2022/02/keeping-up-to-date-with-the-latest-web-development-trends',
      },
      {
        source: '/en/blog/2022/03/a-new-website-for-equilibra',
        destination: '/blog/2022/03/a-new-website-for-equilibra',
      },
      {
        source:
          '/en/blog/2022/10/the-love-and-hate-relationship-between-developers-and-project-management-tools',
        destination:
          '/blog/2022/10/the-love-and-hate-relationship-between-developers-and-project-management-tools',
      },
    ]
  },
}

const loadEnvConfig = require('@next/env').loadEnvConfig

loadEnvConfig(`./`)

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_URL,
  exclude: ['/404', '/500', '/unsupported', '/api', '/admin'],
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/api'],
      },
    ],
  },
}

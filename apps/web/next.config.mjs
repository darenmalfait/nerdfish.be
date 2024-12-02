import withBundleAnalyzer from '@next/bundle-analyzer'
import withNextIntl from 'next-intl/plugin'

const withNextIntlConfig = withNextIntl('./src/app/i18n/request-config.ts')

/** @type {import('next').NextConfig} */
let nextConfig = {
	trailingSlash: false,
	swcMinify: true,
	images: {
		remotePatterns: [{ hostname: 'assets.tina.io' }],
	},
	experimental: {
		serverActions: {
			bodySizeLimit: '2mb',
		},
	},
	async rewrites() {
		return [
			{
				source: '/admin',
				destination: '/admin/index.html',
			},
		]
	},
}

if (process.env.ANALYZE === 'true') {
	nextConfig = withBundleAnalyzer()(nextConfig)
}

// Add internationalization support
nextConfig = withNextIntlConfig(nextConfig)

export default nextConfig

import { withAnalyzer, config } from '@repo/next-config'
import { type NextConfig } from 'next'
import withNextIntl from 'next-intl/plugin'

const withNextIntlConfig = withNextIntl('./src/app/i18n/request-config.ts')

/** @type {import('next').NextConfig} */
let nextConfig: NextConfig = {
	...config,
	images: {
		remotePatterns: [{ hostname: 'assets.tina.io' }],
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
	nextConfig = withAnalyzer(nextConfig)
}

// Add internationalization support
nextConfig = withNextIntlConfig(nextConfig)

export default nextConfig

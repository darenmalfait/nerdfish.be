import { withTranslations } from '@repo/i18n/plugin'
import { withAnalyzer, config } from '@repo/next-config'
import { type NextConfig } from 'next'

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
nextConfig = withTranslations('./request-config.ts', nextConfig)

export default nextConfig

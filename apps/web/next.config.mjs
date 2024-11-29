import withNextIntl from 'next-intl/plugin'

const withNextIntlConfig = withNextIntl('./src/app/i18n/request-config.ts')

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntlConfig({
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
})

export default nextConfig

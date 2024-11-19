/** @type {import('next').NextConfig} */
const nextConfig = {
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
	eslint: {
		ignoreDuringBuilds: true,
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

export default nextConfig

import { withAnalyzer, config } from '@repo/next-config'

/** @type {import('next').NextConfig} */
let nextConfig = {
	...config,
}

if (process.env.ANALYZE === 'true') {
	nextConfig = withAnalyzer(nextConfig)
}

export default nextConfig

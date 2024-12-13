import { withAnalyzer, config } from '@repo/next-config'
import { type NextConfig } from 'next'

/** @type {import('next').NextConfig} */
let nextConfig: NextConfig = {
	...config,
}

if (process.env.ANALYZE === 'true') {
	nextConfig = withAnalyzer(nextConfig)
}

export default nextConfig

import withBundleAnalyzer from '@next/bundle-analyzer'
import { type NextConfig } from 'next'
import { createSecureHeaders } from 'next-secure-headers'

export const config: NextConfig = {
	trailingSlash: false,
	// We are doing this with github actions
	typescript: {
		ignoreBuildErrors: true,
	},
	experimental: {
		serverActions: {
			bodySizeLimit: '2mb',
		},
	},
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: createSecureHeaders({
					frameGuard: 'sameorigin',
					// HSTS Preload: https://hstspreload.org/
					forceHTTPSRedirect: [
						true,
						{ maxAge: 63_072_000, includeSubDomains: true, preload: true },
					],
				}),
			},
		]
	},
}

export const withAnalyzer = (sourceConfig: NextConfig) =>
	withBundleAnalyzer()(sourceConfig)

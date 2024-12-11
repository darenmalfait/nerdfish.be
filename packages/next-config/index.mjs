import withBundleAnalyzer from '@next/bundle-analyzer'
import { createSecureHeaders } from 'next-secure-headers'

export const config = {
	swcMinify: true,
	trailingSlash: false,
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

export const withAnalyzer = (sourceConfig) => withBundleAnalyzer()(sourceConfig)

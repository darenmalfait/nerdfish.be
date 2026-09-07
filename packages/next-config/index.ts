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
				headers: [
					...createSecureHeaders({
						frameGuard: 'sameorigin',
						// Spec: max-age + includeSubDomains; skip preload
						// (https://specification.website/spec/security/hsts/)
						forceHTTPSRedirect: [
							true,
							{ maxAge: 63_072_000, includeSubDomains: true },
						],
						// Spec: stop sending X-XSS-Protection
						xssProtection: false,
						referrerPolicy: 'strict-origin-when-cross-origin',
						contentSecurityPolicy: {
							directives: {
								frameAncestors: ["'self'"],
							},
						},
					}),
					{
						key: 'Permissions-Policy',
						value:
							'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
					},
				],
			},
		]
	},
}

export const withAnalyzer = (sourceConfig: NextConfig) =>
	withBundleAnalyzer()(sourceConfig)

import { withContentCollections } from '@repo/content-collections/plugin'
import { withTranslations } from '@repo/i18n/plugin'
import { withAnalyzer, config } from '@repo/next-config'
import { type NextConfig } from 'next'

let nextConfig: NextConfig = {
	...config,
	async redirects() {
		// OLD LINKS
		return [
			...[
				'/freelance',
				'/3d-printing',
				'/branding',
				'/uxui-design',
				'/webdesign',
			].flatMap((href) => [
				{
					source: href,
					destination: `/expertise${href}`,
					permanent: true,
				},
				{
					source: `/nl${href}`,
					destination: `/nl/expertise${href}`,
					permanent: true,
				},
			]),
		]
	},
	async rewrites() {
		return []
	},
}

if (process.env.ANALYZE === 'true') {
	nextConfig = withAnalyzer(nextConfig)
}

// Add internationalization support
nextConfig = withTranslations('./request-config.ts', nextConfig)

export default withContentCollections(
	// unsure why this needs to be a promise, it's not
	nextConfig as Promise<NextConfig>,
)

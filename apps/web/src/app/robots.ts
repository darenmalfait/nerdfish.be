import { env } from '@repo/env'
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			disallow: ['/api/*', '/tooling/*'],
		},
		sitemap: `${env.NEXT_PUBLIC_URL}/sitemap.xml`,
	}
}

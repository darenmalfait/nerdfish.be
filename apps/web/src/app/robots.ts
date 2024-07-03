import { type MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			disallow: ['/api/*'],
		},
		sitemap: `${process.env.NEXT_PUBLIC_URL}/sitemap.xml`,
	}
}

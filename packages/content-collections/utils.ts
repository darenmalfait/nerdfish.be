import { z } from 'zod'

export const seo = z.object({
	title: z.string(),
	description: z.string(),
	canonical: z.string().optional(),
	image: z.string().optional(),
})

export const imageCredit = z.object({
	name: z.string(),
	url: z.string().url().optional(),
	source: z.enum(['unsplash', 'pexels', 'pixabay']).optional(),
})

export const image = z.object({
	src: z.string(),
	alt: z.string(),
	credit: imageCredit.optional(),
})

export function getSlugAndLocale(path: string) {
	const [locale, ...rest] = path.split('/')

	return {
		locale,
		slug: rest.join('/'),
	}
}

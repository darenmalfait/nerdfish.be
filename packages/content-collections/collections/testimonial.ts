import { defineCollection } from '@content-collections/core'
import { getSlugAndLocale } from '../utils'

export const testimonialTypes = ['colleague', 'project', 'client'] as const

export const testimonials = defineCollection({
	name: 'testimonials',
	directory: '@repo/content-collections/content/testimonials',
	include: '**/*.mdx',
	schema: (z) => ({
		type: z.enum(testimonialTypes),
		quote: z.string(),
		author: z
			.object({
				name: z.string(),
				company: z.string(),
			})
			.optional(),
		tags: z.array(z.string()).optional(),
	}),
	transform: async ({ ...item }) => {
		const { slug, locale } = getSlugAndLocale(item._meta.path)

		return {
			...item,
			id: crypto.randomUUID(),
			slug,
			locale,
		}
	},
})

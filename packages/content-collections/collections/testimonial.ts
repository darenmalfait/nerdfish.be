import { defineCollection } from '@content-collections/core'
import { z } from 'zod'
import { getSlugAndLocale } from '../utils'

export const testimonialTypes = ['colleague', 'project', 'client'] as const

export const testimonials = defineCollection({
	name: 'testimonials',
	directory: 'content/testimonials',
	include: '**/*.mdx',
	schema: z.object({
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

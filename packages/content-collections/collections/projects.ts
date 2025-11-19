import crypto from 'crypto'
import { defineCollection } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import { remarkGfm } from 'fumadocs-core/mdx-plugins'
import lqip, { type LqipModernOutput } from 'lqip-modern'
import { z } from 'zod'
import { getSlugAndLocale, image, seo } from '../utils'

export const projects = defineCollection({
	name: 'projects',
	directory: 'content/projects',
	include: '**/*.mdx',
	schema: z.object({
		seo,
		title: z.string(),
		excerpt: z.string(),
		category: z.enum(['print', 'webdesign', 'branding', 'product']),
		date: z.string(),
		url: z.string().optional(),
		heroImg: image,
		summary: z.string().optional(),
		tags: z.array(z.string()),
	}),
	transform: async ({ title, ...item }, context) => {
		try {
			const [body, summary, blur] = await Promise.all([
				context.cache(item.content, async () =>
					compileMDX(context, item, {
						remarkPlugins: [remarkGfm],
						rehypePlugins: [],
					}),
				),
				item.summary
					? context.cache(item.summary, async () =>
							compileMDX(
								context,
								{ ...item, content: item.summary ?? '' },
								{
									remarkPlugins: [remarkGfm],
									rehypePlugins: [],
								},
							),
						)
					: null,
				context.cache(item._meta.path, async () =>
					lqip(`./public/${item.heroImg.src}`),
				),
			])

			const result: LqipModernOutput = Array.isArray(blur) ? blur[0] : blur

			return {
				id: crypto.randomUUID(),
				...item,
				title,
				body,
				summary,
				...getSlugAndLocale(item._meta.path),
				imageBlur: result.metadata.dataURIBase64,
			}
		} catch (error) {
			if (error instanceof Error) {
				console.error('Failed to transform content:', error)
				throw new Error(`Failed to transform content: ${error.message}`)
			}

			throw new Error('Failed to transform content')
		}
	},
})

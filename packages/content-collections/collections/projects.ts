import crypto from 'crypto'
import { defineCollection } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import { remarkGfm } from 'fumadocs-core/mdx-plugins'
import lqip, { type LqipModernOutput } from 'lqip-modern'
import { getSlugAndLocale, image, seo } from '../utils'

export const projects = defineCollection({
	name: 'projects',
	directory: 'content/projects',
	include: '**/*.mdx',
	schema: (z) => ({
		seo,
		title: z.string(),
		excerpt: z.string(),
		category: z.enum(['print', 'webdesign', 'branding']),
		date: z.string(),
		url: z.string().optional(),
		heroImg: image,
		summary: z.string().optional(),
		tags: z.array(z.string()),
	}),
	transform: async ({ title, ...page }, context) => {
		try {
			const [body, summary, blur] = await Promise.all([
				context.cache(page.content, async () =>
					compileMDX(context, page, {
						remarkPlugins: [remarkGfm],
						rehypePlugins: [],
					}),
				),
				page.summary
					? context.cache(page.summary, async () =>
							compileMDX(
								context,
								{ ...page, content: page.summary ?? '' },
								{
									remarkPlugins: [remarkGfm],
									rehypePlugins: [],
								},
							),
						)
					: null,
				context.cache(page._meta.path, async () =>
					lqip(`./public/${page.heroImg.src}`),
				),
			])

			const result: LqipModernOutput = Array.isArray(blur) ? blur[0] : blur

			return {
				id: crypto.randomUUID(),
				...page,
				title,
				body,
				summary,
				...getSlugAndLocale(page._meta.path),
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

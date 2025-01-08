import crypto from 'crypto'
import { defineCollection } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import { remarkGfm } from 'fumadocs-core/mdx-plugins'
import lqip, { type LqipModernOutput } from 'lqip-modern'
import { getSlugAndLocale, image, seo } from '../utils'

export const posts = defineCollection({
	name: 'posts',
	directory: '@repo/content-collections/content/blog',
	include: '**/*.mdx',
	schema: (z) => ({
		seo,
		title: z.string(),
		excerpt: z.string(),
		category: z.enum(['technical', 'coaching', 'blog', 'project']),
		date: z.string(),
		heroImg: image,
		tags: z.array(z.string()),
	}),
	transform: async ({ title, ...item }, context) => {
		try {
			const [body, blur] = await Promise.all([
				context.cache(item.content, async () =>
					compileMDX(context, item, {
						remarkPlugins: [remarkGfm],
						rehypePlugins: [],
					}),
				),
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

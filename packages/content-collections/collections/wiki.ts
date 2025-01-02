import crypto from 'crypto'
import { defineCollection } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import { remarkGfm } from 'fumadocs-core/mdx-plugins'
import { seo } from '../utils'

export const wiki = defineCollection({
	name: 'wiki',
	directory: 'content/wiki',
	include: '**/*.mdx',
	schema: (z) => ({
		seo,
		title: z.string(),
		excerpt: z.string(),
		date: z.string(),
		tags: z.array(z.string()),
	}),
	transform: async (page, context) => {
		const body = await context.cache(page.content, async () =>
			compileMDX(context, page, {
				remarkPlugins: [remarkGfm],
				rehypePlugins: [],
			}),
		)

		return {
			id: crypto.randomUUID(),
			...page,
			body,
			// wiki is not multilingual, so we can use the path as slug
			slug: page._meta.path,
		}
	},
})

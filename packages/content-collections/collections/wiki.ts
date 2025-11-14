import crypto from 'crypto'
import { defineCollection } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import { remarkGfm } from 'fumadocs-core/mdx-plugins'
import { z } from 'zod'
import { seo } from '../utils'

export const wiki = defineCollection({
	name: 'wiki',
	directory: 'content/wiki',
	include: ['**/*.mdx', '**/*.md'],
	exclude: ['**/_templates/**', '**/.obsidian/**'],
	schema: z.object({
		seo,
		title: z.string(),
		excerpt: z.string(),
		date: z.string(),
		tags: z.array(z.string()),
	}),
	transform: async (item, context) => {
		const body = await context.cache(item.content, async () =>
			compileMDX(context, item, {
				remarkPlugins: [remarkGfm],
				rehypePlugins: [],
			}),
		)

		return {
			id: crypto.randomUUID(),
			...item,
			body,
			// wiki is not multilingual, so we can use the path as slug
			slug: item._meta.path,
		}
	},
})

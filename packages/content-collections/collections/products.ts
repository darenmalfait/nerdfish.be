import crypto from 'crypto'
import { defineCollection } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import { remarkGfm } from 'fumadocs-core/mdx-plugins'
import { z } from 'zod'
import { getSlugAndLocale, image, seo } from '../utils'

export const products = defineCollection({
	name: 'products',
	directory: 'content/products',
	include: '**/*.mdx',
	schema: z.object({
		seo,
		title: z.string(),
		description: z.string(),
		url: z.string().url().optional(),
		sourceUrl: z.string().url().optional(),
		icon: image,
		images: z.array(image).optional(),
	}),
	transform: async ({ title, ...item }, context) => {
		try {
			const body = await context.cache(item.content, async () =>
				compileMDX(context, item, {
					remarkPlugins: [remarkGfm],
					rehypePlugins: [],
				}),
			)

			return {
				id: crypto.randomUUID(),
				...item,
				title,
				body,
				...getSlugAndLocale(item._meta.path),
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

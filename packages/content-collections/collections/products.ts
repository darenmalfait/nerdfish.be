import crypto from 'crypto'
import { defineCollection } from '@content-collections/core'
import { image } from '../utils'

export const products = defineCollection({
	name: 'products',
	directory: 'content/products',
	include: '**/*.mdx',
	schema: (z) => ({
		title: z.string(),
		description: z.string(),
		url: z.string().url().optional(),
		sourceUrl: z.string().url().optional(),
		image,
	}),
	transform: async (item) => {
		return {
			id: crypto.randomUUID(),
			...item,
		}
	},
})

import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import { remarkGfm } from 'fumadocs-core/mdx-plugins'
import uniqueId from 'lodash/uniqueId.js'
import lqip from 'lqip-modern'

import { getSlugAndLocale, image, seo } from './utils'

const posts = defineCollection({
	name: 'posts',
	directory: 'content/blog',
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
	transform: async ({ title, ...page }, context) => {
		const body = await context.cache(page.content, async () =>
			compileMDX(context, page, {
				remarkPlugins: [remarkGfm],
				rehypePlugins: [],
			}),
		)

		const blur = await context.cache(page._meta.path, async () =>
			lqip(`./public/${page.heroImg.src}`),
		)

		const result = Array.isArray(blur) ? blur[0] : blur

		return {
			id: uniqueId(),
			...page,
			title,
			body,
			...getSlugAndLocale(page._meta.path),
			imageBlur: result.metadata.dataURIBase64 as string,
		}
	},
})

export default defineConfig({
	collections: [posts],
})

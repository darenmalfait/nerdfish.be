import { type Post } from 'content-collections'

import { type Article } from '@repo/design-system/components/article-overview'
import { type PartialDeep } from '@repo/lib/types'
import { nonNullable } from '@repo/lib/utils/array'
import { getCrypto } from '@repo/lib/utils/misc'

import { getBlogPath } from './get-blog-path'

export function toArticleFromBlog(item: PartialDeep<Post>): Article {
	return {
		id: item.id ?? getCrypto().randomUUID(),
		title: item.title ?? 'untitled',
		description: item.excerpt,
		href: getBlogPath(item),
		tags: nonNullable(item.tags ?? []),
		category: item.category,
		date: item.date,
		image: item.heroImg?.src
			? {
					src: item.heroImg.src,
					alt: item.heroImg.alt ?? item.title ?? 'untitled',
				}
			: undefined,
		base64Placeholder: item.imageBlur,
	}
}

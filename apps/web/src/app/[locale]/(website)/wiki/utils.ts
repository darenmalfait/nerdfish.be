import { type Article } from '@repo/design-system/components/article-overview'
import { type PartialDeep } from '@repo/lib/types'
import { nonNullable } from '@repo/lib/utils/array'
import { getCrypto } from '@repo/lib/utils/misc'
import { type Wiki } from 'content-collections'

export function getWikiPath(post: PartialDeep<Wiki>) {
	return `/en/wiki/${post.slug}`
}

export function toArticleFromWiki(item: PartialDeep<Wiki>): Article {
	return {
		id: item.id ?? getCrypto().randomUUID(),
		title: item.title ?? 'untitled',
		description: item.excerpt,
		href: getWikiPath(item),
		tags: nonNullable(item.tags ?? []),
		date: item.date,
	}
}

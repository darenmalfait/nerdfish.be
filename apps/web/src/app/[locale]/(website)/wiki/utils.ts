import { type Article } from '@repo/design-system/components/article-overview'
import { type PartialDeep } from '@repo/lib/types'
import { nonNullable } from '@repo/lib/utils/array'
import { getCrypto } from '@repo/lib/utils/misc'
import { type Wiki } from 'content-collections'
import Fuse from 'fuse.js'

type WikiSearchable = {
	title?: string | null
	tags?: string[] | null
	excerpt?: string | null
	description?: string | null
}

export function filterWiki<T extends WikiSearchable>(
	posts: T[],
	searchString: string,
): T[] {
	if (!searchString) return posts

	const words = searchString.split(' ')
	let results = posts

	for (const word of words) {
		const fuse = new Fuse(results, {
			keys: ['title', 'tags', 'excerpt', 'description'],
			isCaseSensitive: false,
			minMatchCharLength: 1,
			threshold: 0.3,
		})
		results = fuse.search(word).map((result) => result.item)
	}

	return results
}

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

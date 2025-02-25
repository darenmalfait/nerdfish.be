import { type Article } from '@repo/design-system/components/article-overview'
import { type PartialDeep } from '@repo/lib/types'
import { nonNullable } from '@repo/lib/utils/array'
import { type Wiki } from 'content-collections'
import Fuse from 'fuse.js'
import { getCrypto } from '../tooling/(timesheets)/timesheets/utils'

export function filterWiki(posts: PartialDeep<Wiki>[], searchString: string) {
	if (!searchString) return posts

	const fuse = new Fuse(posts, {
		keys: ['title', 'tags', 'excerpt'],
		minMatchCharLength: 1,
		threshold: 0.3,
	})

	const allResults = fuse.search(searchString).map((result) => result.item)

	const words = new Set(searchString.split(' '))

	// if there's only one word then we're done
	if (words.size < 2) return allResults

	// if there are multiple words, we'll conduct an individual search for each word
	// and then combine the results
	const individualWordResults = new Set<PartialDeep<Wiki>>()

	for (const word of words) {
		const items = fuse.search(word).map((result) => result.item)

		for (const item of items) {
			individualWordResults.add(item)
		}
	}

	return Array.from(new Set([...allResults, ...individualWordResults]))
}

export function getWikiPath(post: PartialDeep<Wiki>) {
	return `/en/wiki/${post.slug}`
}

export function mapWikiToArticle(items: PartialDeep<Wiki>[]): Article[] {
	return items.map((item) => ({
		id: item.id ?? getCrypto().randomUUID(),
		title: item.title ?? 'untitled',
		description: item.excerpt,
		href: getWikiPath(item),
		tags: nonNullable(item.tags ?? []),
		date: item.date,
	}))
}

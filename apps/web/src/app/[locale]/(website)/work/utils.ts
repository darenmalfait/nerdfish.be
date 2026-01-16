import { type Article } from '@repo/design-system/components/article-overview'
import { i18n } from '@repo/i18n/config'
import { type PartialDeep } from '@repo/lib/types'
import { nonNullable } from '@repo/lib/utils/array'
import { getCrypto } from '@repo/lib/utils/misc'
import { type Project } from 'content-collections'
import Fuse from 'fuse.js'

export function filterWork(
	posts: PartialDeep<Project>[],
	searchString: string,
) {
	if (!searchString) return posts

	const fuse = new Fuse(posts, {
		keys: ['title', 'tags', 'category', 'excerpt'],
		minMatchCharLength: 1,
		threshold: 0.3,
	})

	const allResults = fuse.search(searchString).map((result) => result.item)

	const words = new Set(searchString.split(' '))

	// if there's only one word then we're done
	if (words.size < 2) return allResults

	// if there are multiple words, we'll conduct an individual search for each word
	// and then combine the results
	const individualWordResults = new Set<PartialDeep<Project>>()

	for (const word of words) {
		const items = fuse.search(word).map((result) => result.item)

		for (const item of items) {
			individualWordResults.add(item)
		}
	}

	return Array.from(new Set([...allResults, ...individualWordResults]))
}

export function getWorkPath(post: PartialDeep<Project>) {
	const locale = post.locale

	const localePath = locale === i18n.defaultLocale ? '' : `/${locale}`
	const blogPath = `/work/${post.slug}`

	return `${localePath}${blogPath}`
}

export function mapWorkToArticle(items: PartialDeep<Project>[]): Article[] {
	return items.map((item) => ({
		id: item.id ?? getCrypto().randomUUID(),
		title: item.title ?? 'untitled',
		description: item.excerpt,
		href: getWorkPath(item),
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
	}))
}

import Fuse from 'fuse.js'
import { type Article } from './types'

export function filterArticles(articles: Article[], searchString: string) {
	if (!searchString) return articles

	const fuse = new Fuse(articles, {
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
	const individualWordResults = new Set<Article>()

	for (const word of words) {
		const items = fuse.search(word).map((result) => result.item)

		for (const item of items) {
			individualWordResults.add(item)
		}
	}

	return Array.from(new Set([...allResults, ...individualWordResults]))
}

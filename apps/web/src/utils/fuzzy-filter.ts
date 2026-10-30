import Fuse, { type FuseOptionKey } from 'fuse.js'

/**
 * Full-query matches rank first; for multi-word queries, items matching any
 * single word are appended so partial matches still show up.
 */
export function fuzzyFilter<T>(
	items: T[],
	query: string,
	keys: FuseOptionKey<T>[],
): T[] {
	if (!query) return items

	const fuse = new Fuse(items, {
		keys,
		minMatchCharLength: 1,
		threshold: 0.3,
	})

	const allResults = fuse.search(query).map((result) => result.item)

	const words = new Set(query.split(' '))

	if (words.size < 2) return allResults

	const individualWordResults = new Set<T>()

	for (const word of words) {
		const wordItems = fuse.search(word).map((result) => result.item)

		for (const item of wordItems) {
			individualWordResults.add(item)
		}
	}

	return Array.from(new Set([...allResults, ...individualWordResults]))
}

import Fuse from 'fuse.js'

type BlogSearchable = {
	title?: string | null
	tags?: string[] | null
	excerpt?: string | null
	description?: string | null
}

export function filterBlog<T extends BlogSearchable>(
	posts: T[],
	searchString: string,
): T[] {
	if (!searchString) return posts

	const fuse = new Fuse(posts, {
		keys: ['title', 'tags', 'excerpt', 'description'],
		minMatchCharLength: 1,
		threshold: 0.3,
	})

	const allResults = fuse.search(searchString).map((result) => result.item)

	const words = new Set(searchString.split(' '))

	// if there's only one word then we're done
	if (words.size < 2) return allResults

	// if there are multiple words, we'll conduct an individual search for each word
	// and then combine the results
	const individualWordResults = new Set<T>()

	for (const word of words) {
		const items = fuse.search(word).map((result) => result.item)

		for (const item of items) {
			individualWordResults.add(item)
		}
	}

	return Array.from(new Set([...allResults, ...individualWordResults]))
}

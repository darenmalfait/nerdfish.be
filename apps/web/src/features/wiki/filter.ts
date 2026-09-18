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

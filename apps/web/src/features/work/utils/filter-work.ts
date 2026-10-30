import { fuzzyFilter } from '~/utils/fuzzy-filter'

type WorkSearchable = {
	title?: string | null
	tags?: string[] | null
	category?: string | null
	excerpt?: string | null
	description?: string | null
}

export function filterWork<T extends WorkSearchable>(
	posts: T[],
	searchString: string,
): T[] {
	return fuzzyFilter(posts, searchString, [
		'title',
		'tags',
		'category',
		'excerpt',
		'description',
	])
}

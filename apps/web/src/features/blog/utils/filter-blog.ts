import { fuzzyFilter } from '~/utils/fuzzy-filter'

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
	return fuzzyFilter(posts, searchString, [
		'title',
		'tags',
		'excerpt',
		'description',
	])
}

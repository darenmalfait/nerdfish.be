import { type Article } from '@repo/design-system/components/article-overview'
import { nonNullable } from '@repo/design-system/lib/utils/array'
import { type PartialDeep } from '@repo/design-system/lib/utils/types'
import { i18n } from '@repo/i18n/config'
import { type Post } from 'content-collections'
import uniqueId from 'lodash/uniqueId'
import { matchSorter, rankings as matchSorterRankings } from 'match-sorter'

export function filterBlog(posts: PartialDeep<Post>[], searchString: string) {
	if (!searchString) return posts

	const options = {
		keys: [
			{
				key: 'title',
				threshold: matchSorterRankings.CONTAINS,
			},
			{
				key: 'tags.*',
				threshold: matchSorterRankings.CONTAINS,
				maxRanking: matchSorterRankings.CONTAINS,
			},
			{
				key: 'category.*',
				threshold: matchSorterRankings.CONTAINS,
				maxRanking: matchSorterRankings.CONTAINS,
			},
			{
				key: 'excerpt',
				threshold: matchSorterRankings.CONTAINS,
				maxRanking: matchSorterRankings.CONTAINS,
			},
			{
				key: 'body.*.children.*.text',
				threshold: matchSorterRankings.CONTAINS,
				maxRanking: matchSorterRankings.CONTAINS,
			},
		],
	}

	const allResults = matchSorter(posts, searchString, options)
	const searches = new Set(searchString.split(' '))
	if (searches.size < 2) {
		// if there's only one word then we're done
		return allResults
	}

	// if there are multiple words, we'll conduct an individual search for each word
	const [firstWord, ...restWords] = searches.values()
	if (!firstWord) {
		// this should be impossible, but if it does happen, we'll just return an empty array
		return []
	}

	const individualWordOptions = {
		...options,
		keys: options.keys.map((key) => {
			return {
				...key,
				maxRanking: matchSorterRankings.CASE_SENSITIVE_EQUAL,
				threshold: matchSorterRankings.WORD_STARTS_WITH,
			}
		}),
	}

	// go through each word and further filter the results
	let individualWordResults = matchSorter(
		posts,
		firstWord,
		individualWordOptions,
	)
	for (const word of restWords) {
		const searchResult = matchSorter(
			individualWordResults,
			word,
			individualWordOptions,
		)
		individualWordResults = individualWordResults.filter((r) =>
			searchResult.includes(r),
		)
	}

	return Array.from(new Set([...allResults, ...individualWordResults]))
}

export function getBlogPath(post: PartialDeep<Post>) {
	const locale = post.locale

	const localePath = locale === i18n.defaultLocale ? '' : `/${locale}`
	const blogPath = `/blog/${post.slug}`

	return `${localePath}${blogPath}`
}

export function mapBlogToArticle(items: PartialDeep<Post>[]): Article[] {
	return items.map((item) => ({
		id: item.id ?? uniqueId(),
		title: item.title ?? 'untitled',
		description: item.excerpt,
		href: getBlogPath(item),
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

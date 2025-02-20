import { type Article } from '@repo/design-system/components/article-overview'
import { i18n } from '@repo/i18n/config'
import { type PartialDeep } from '@repo/lib/types'
import { nonNullable } from '@repo/lib/utils/array'
import { type Project } from 'content-collections'
import { matchSorter, rankings as matchSorterRankings } from 'match-sorter'
import { getCrypto } from '../tooling/(timesheets)/timesheets/utils'

export function filterWork(
	works: PartialDeep<Project>[],
	searchString: string,
) {
	if (!searchString) return works

	const options = {
		keys: [
			{
				key: 'title',
				threshold: matchSorterRankings.CONTAINS,
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

	const allResults = matchSorter(works, searchString, options)
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
		works,
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

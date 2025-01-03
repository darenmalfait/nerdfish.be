import { type Article } from '@repo/design-system/components/article-overview'
import { type PartialDeep } from '@repo/design-system/lib/utils/types'
import { i18n } from '@repo/i18n/config'
import { type Locale } from '@repo/i18n/types'
import uniqueId from 'lodash/uniqueId'
import { matchSorter, rankings as matchSorterRankings } from 'match-sorter'
import { type Work } from '~/app/cms/types'

export const WorkPath: {
	[key in Locale]: string
} = {
	en: '/work',
	nl: '/nl/werk',
}

export function filterWork(works: PartialDeep<Work>[], searchString: string) {
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

export function getWorkPath(work: PartialDeep<Work>) {
	const path = work._sys?.breadcrumbs?.join('/')
	const locale = work._sys?.breadcrumbs?.[0]

	const newPath = path?.replace(`${locale}/`, '/') ?? ''

	if (locale === i18n.defaultLocale) return `/work${newPath}`
	return `/${locale}/work${newPath}`
}

export function mapWorkToArticle(works: PartialDeep<Work>[]): Article[] {
	return works.map((work) => ({
		id: work.id ?? uniqueId(),
		title: work.title ?? 'untitled',
		excerpt: work.excerpt ?? undefined,
		href: getWorkPath(work),
		tags: work.category ? [work.category] : [],
		category: work.category,
		date: work.date,
		image: work.heroImg?.src
			? {
					src: work.heroImg.src,
					alt: work.heroImg.alt ?? work.title ?? 'untitled',
				}
			: undefined,
	}))
}

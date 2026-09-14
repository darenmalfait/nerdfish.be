'use client'

import { type Article } from '@repo/design-system/components/article-overview'
import { useCallback } from 'react'
import { filterWiki } from '../../filter'
import {
	WikiOverviewContent,
	type WikiOverviewContentProps,
} from './wiki-overview-content'

/** Searchable variant — isolate fuse.js to this client chunk only */
export function WikiOverviewContentSearchable(
	props: Omit<WikiOverviewContentProps, 'customFilterFunction' | 'searchEnabled'>,
) {
	const { items } = props

	const filterArticles = useCallback(
		(toFilter: Article[], searchString: string) => {
			const toFilterIds = new Set(toFilter.map((article) => article.id))
			const articles = items.filter((article) => toFilterIds.has(article.id))

			return filterWiki(articles, searchString)
		},
		[items],
	)

	return (
		<WikiOverviewContent
			{...props}
			searchEnabled
			customFilterFunction={filterArticles}
		/>
	)
}

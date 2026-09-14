'use client'

import { type Article } from '@repo/design-system/components/article-overview'
import { useCallback } from 'react'
import { filterWork } from '../../filter'
import {
	WorkOverviewContent,
	type WorkOverviewContentProps,
} from './work-overview-content'

/** Searchable variant — isolate fuse.js to this client chunk only */
export function WorkOverviewContentSearchable(
	props: Omit<
		WorkOverviewContentProps,
		'customFilterFunction' | 'searchEnabled'
	>,
) {
	const { items } = props

	const filterArticles = useCallback(
		(toFilter: Article[], searchString: string) => {
			const toFilterIds = new Set(toFilter.map((article) => article.id))
			const articles = items.filter((article) => toFilterIds.has(article.id))

			return filterWork(articles, searchString)
		},
		[items],
	)

	return (
		<WorkOverviewContent
			{...props}
			searchEnabled
			customFilterFunction={filterArticles}
		/>
	)
}

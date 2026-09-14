'use client'

import { type Article } from '@repo/design-system/components/article-overview'
import { useCallback } from 'react'
import { filterBlog } from '../../filter'
import {
	BlogOverviewContent,
	type BlogOverviewContentProps,
} from './blog-overview-content'

/** Searchable variant — isolate fuse.js to this client chunk only */
export function BlogOverviewContentSearchable(
	props: Omit<BlogOverviewContentProps, 'customFilterFunction' | 'searchEnabled'>,
) {
	const { items } = props

	const filterArticles = useCallback(
		(toFilter: Article[], searchString: string) => {
			const toFilterIds = new Set(toFilter.map((article) => article.id))
			const articles = items.filter((article) => toFilterIds.has(article.id))

			return filterBlog(articles, searchString)
		},
		[items],
	)

	return (
		<BlogOverviewContent
			{...props}
			searchEnabled
			customFilterFunction={filterArticles}
		/>
	)
}

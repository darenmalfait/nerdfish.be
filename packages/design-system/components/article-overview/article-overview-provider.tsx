'use client'

import * as React from 'react'
import { nonNullable } from '../../lib/utils/array'
import { type Article } from './types'
import { filterArticles } from './utils'

interface ArticleOverviewContextProps {
	articles: Article[]
	searchEnabled: boolean
	tags: string[]
	featuredArticleEnabled: boolean
	filter: string
	toggleFilter: (tag: string) => void
	setFilter: (filter: string) => void
	itemsToShow: number
	loadMore: () => void
}

const ArticleOverviewContext =
	React.createContext<ArticleOverviewContextProps | null>(null)
ArticleOverviewContext.displayName = 'ArticleOverviewContext'

// import { useArticleOverview } fron "path-to-context/ArticleOverviewContext"
// within functional component
// const { sessionToken, ...ArticleOverviewContext } = useArticleOverview()
export function useArticleOverview(): ArticleOverviewContextProps {
	const context = React.useContext(ArticleOverviewContext)

	if (!context) {
		throw new Error(
			'You should use useArticleOverview within an ArticleOverviewContext',
		)
	}

	return context
}

const PAGE_SIZE = 6

export function ArticleOverviewProvider({
	children,
	allArticles,
	searchEnabled = false,
	featuredArticleEnabled = false,
	customFilterFunction,
}: {
	children: React.ReactNode
	allArticles: Article[]
	searchEnabled?: boolean
	featuredArticleEnabled?: boolean
	customFilterFunction?: (articles: Article[], filter: string) => Article[]
}) {
	const [filter, setFilter] = React.useState('')
	const [itemsToShow, setItemsToShow] = React.useState(PAGE_SIZE)

	const filteredArticles = React.useMemo(() => {
		return customFilterFunction
			? customFilterFunction(allArticles, filter)
			: filterArticles(allArticles, filter)
	}, [allArticles, customFilterFunction, filter])

	const toggleFilter = React.useCallback((tag: string) => {
		setFilter((current) => {
			const currentTags = current.split(' ').filter(Boolean)
			const tagExists = currentTags.includes(tag)

			const newTags = tagExists
				? currentTags.filter((t) => t !== tag)
				: [...currentTags, tag]

			return newTags.join(' ')
		})
	}, [])

	const tags = React.useMemo(
		() =>
			nonNullable([...new Set(allArticles.flatMap((article) => article.tags))]),
		[allArticles],
	)

	const loadMore = React.useCallback(() => {
		setItemsToShow((i) => i + PAGE_SIZE)
	}, [])

	return (
		<ArticleOverviewContext.Provider
			value={React.useMemo(
				() => ({
					articles: filteredArticles,
					toggleFilter,
					filter,
					tags,
					setFilter,
					searchEnabled,
					featuredArticleEnabled,
					itemsToShow,
					loadMore,
				}),
				[
					filteredArticles,
					toggleFilter,
					filter,
					tags,
					searchEnabled,
					featuredArticleEnabled,
					itemsToShow,
					loadMore,
				],
			)}
		>
			{children}
		</ArticleOverviewContext.Provider>
	)
}

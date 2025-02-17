'use client'

import { parseAsString, useQueryStates } from 'nuqs'
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
	setFilter: (filter: string) => Promise<void>
	resetFilter: () => Promise<void>
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

export interface ArticleOverviewProviderProps {
	children: React.ReactNode
	allArticles: Article[]
	searchEnabled?: boolean
	featuredArticleEnabled?: boolean
	customFilterFunction?: (articles: Article[], filter: string) => Article[]
}

export function ArticleOverviewProvider({
	children,
	allArticles,
	searchEnabled = false,
	featuredArticleEnabled = false,
	customFilterFunction,
}: ArticleOverviewProviderProps) {
	const [params, setParams] = useQueryStates({
		search: parseAsString.withDefault(''),
	})

	const [itemsToShow, setItemsToShow] = React.useState(PAGE_SIZE)

	const filteredArticles = customFilterFunction
		? customFilterFunction(allArticles, params.search)
		: filterArticles(allArticles, params.search)

	async function setFilter(filter: string) {
		await setParams({
			search: filter,
		})
	}

	async function toggleFilter(tag: string) {
		const currentTags = params.search.split(' ').filter(Boolean)
		const tagExists = currentTags.includes(tag)

		await setParams({
			search: tagExists
				? currentTags.filter((t) => t !== tag).join(' ')
				: [...currentTags, tag].join(' '),
		})
	}

	async function resetFilter() {
		await setParams({
			search: '',
		})
	}

	const tags = nonNullable([
		...new Set(allArticles.flatMap((article) => article.tags)),
	])

	function loadMore() {
		setItemsToShow((i) => i + PAGE_SIZE)
	}

	return (
		<ArticleOverviewContext
			value={{
				articles: filteredArticles,
				toggleFilter,
				filter: params.search,
				resetFilter,
				setFilter,
				tags,
				searchEnabled,
				featuredArticleEnabled,
				itemsToShow,
				loadMore,
			}}
		>
			{children}
		</ArticleOverviewContext>
	)
}

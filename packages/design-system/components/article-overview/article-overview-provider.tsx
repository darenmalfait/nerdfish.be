'use client'

import { nonNullable } from '@repo/lib/utils/array'
import { parseAsString, useQueryStates } from 'nuqs'
import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react'
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
	createContext<ArticleOverviewContextProps | null>(null)
ArticleOverviewContext.displayName = 'ArticleOverviewContext'

export function useArticleOverview(): ArticleOverviewContextProps {
	const context = useContext(ArticleOverviewContext)

	if (!context) {
		throw new Error(
			'You should use useArticleOverview within an ArticleOverviewContext',
		)
	}

	return context
}

const PAGE_SIZE = 6

export interface ArticleOverviewProviderProps {
	children: ReactNode
	allArticles: Article[]
	searchEnabled?: boolean
	featuredArticleEnabled?: boolean
	customFilterFunction?: (articles: Article[], filter: string) => Article[]
}

function useFilteredArticles(
	allArticles: Article[],
	filter: string,
	customFilterFunction?: (articles: Article[], filter: string) => Article[],
) {
	return useMemo(
		() =>
			customFilterFunction
				? customFilterFunction(allArticles, filter)
				: filterArticles(allArticles, filter),
		[allArticles, customFilterFunction, filter],
	)
}

function ArticleOverviewProviderLocal({
	children,
	allArticles,
	featuredArticleEnabled = false,
	customFilterFunction,
}: Omit<ArticleOverviewProviderProps, 'searchEnabled'>) {
	const [filter, setFilterState] = useState('')
	const [itemsToShow, setItemsToShow] = useState(PAGE_SIZE)

	const filteredArticles = useFilteredArticles(
		allArticles,
		filter,
		customFilterFunction,
	)

	const setFilter = useCallback(async (next: string) => {
		setFilterState(next)
	}, [])

	const toggleFilter = useCallback(async (tag: string) => {
		setFilterState((current) => {
			const currentTags = current.split(' ').filter(Boolean)
			const hasTag = currentTags.includes(tag)
			return hasTag
				? currentTags.filter((t) => t !== tag).join(' ')
				: [...currentTags, tag].join(' ')
		})
	}, [])

	const resetFilter = useCallback(async () => {
		setFilterState('')
	}, [])

	const tags = nonNullable([
		...new Set(allArticles.flatMap((article) => article.tags)),
	])

	return (
		<ArticleOverviewContext
			value={{
				articles: filteredArticles,
				toggleFilter,
				filter,
				resetFilter,
				setFilter,
				tags,
				searchEnabled: false,
				featuredArticleEnabled,
				itemsToShow,
				loadMore: () => setItemsToShow((i) => i + PAGE_SIZE),
			}}
		>
			{children}
		</ArticleOverviewContext>
	)
}

function ArticleOverviewProviderWithSearch({
	children,
	allArticles,
	featuredArticleEnabled = false,
	customFilterFunction,
}: Omit<ArticleOverviewProviderProps, 'searchEnabled'>) {
	const [params, setParams] = useQueryStates({
		search: parseAsString,
	})
	const [itemsToShow, setItemsToShow] = useState(PAGE_SIZE)
	const filter = params.search ?? ''

	const filteredArticles = useFilteredArticles(
		allArticles,
		filter,
		customFilterFunction,
	)

	async function setFilter(next: string) {
		await setParams({ search: next })
	}

	async function toggleFilter(tag: string) {
		const currentTags = filter.split(' ').filter(Boolean)
		const hasTag = currentTags.includes(tag)

		await setParams({
			search: hasTag
				? currentTags.filter((t) => t !== tag).join(' ')
				: [...currentTags, tag].join(' '),
		})
	}

	async function resetFilter() {
		await setParams({ search: '' })
	}

	const tags = nonNullable([
		...new Set(allArticles.flatMap((article) => article.tags)),
	])

	return (
		<ArticleOverviewContext
			value={{
				articles: filteredArticles,
				toggleFilter,
				filter,
				resetFilter,
				setFilter,
				tags,
				searchEnabled: true,
				featuredArticleEnabled,
				itemsToShow,
				loadMore: () => setItemsToShow((i) => i + PAGE_SIZE),
			}}
		>
			{children}
		</ArticleOverviewContext>
	)
}

export function ArticleOverviewProvider({
	children,
	allArticles,
	searchEnabled = false,
	featuredArticleEnabled = false,
	customFilterFunction,
}: ArticleOverviewProviderProps) {
	if (searchEnabled) {
		return (
			<ArticleOverviewProviderWithSearch
				allArticles={allArticles}
				featuredArticleEnabled={featuredArticleEnabled}
				customFilterFunction={customFilterFunction}
			>
				{children}
			</ArticleOverviewProviderWithSearch>
		)
	}

	return (
		<ArticleOverviewProviderLocal
			allArticles={allArticles}
			featuredArticleEnabled={featuredArticleEnabled}
			customFilterFunction={customFilterFunction}
		>
			{children}
		</ArticleOverviewProviderLocal>
	)
}

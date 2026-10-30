'use client'

import {
	createContext,
	type ReactNode,
	useCallback,
	use,
	useMemo,
	useState,
} from 'react'
import { nonNullable } from '@repo/lib/utils/array'
import { parseAsString, useQueryStates } from 'nuqs'

import { type Article } from './types'
import { filterArticles } from './utils'

interface ArticleOverviewContextProps {
	state: {
		articles: Article[]
		featuredArticle?: Article
		visibleArticles: Article[]
		hasMore: boolean
		tags: string[]
		filter: string
	}
	actions: {
		toggleFilter: (tag: string) => void
		setFilter: (filter: string) => Promise<void>
		resetFilter: () => Promise<void>
		loadMore: () => void
	}
	meta: {
		searchEnabled: boolean
		featuredArticleEnabled: boolean
		readMoreLabel: string
		readMoreAriaLabel: string
	}
}

const ArticleOverviewContext =
	createContext<ArticleOverviewContextProps | null>(null)
ArticleOverviewContext.displayName = 'ArticleOverviewContext'

export function useArticleOverview(): ArticleOverviewContextProps {
	const context = use(ArticleOverviewContext)

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
	readMoreLabel?: string
	readMoreAriaLabel?: string
}

type ArticleOverviewSourceProps = Omit<
	ArticleOverviewProviderProps,
	'children' | 'searchEnabled'
>

function toggleTag(filter: string, tag: string) {
	const currentTags = filter.split(' ').filter(Boolean)

	return currentTags.includes(tag)
		? currentTags.filter((t) => t !== tag).join(' ')
		: [...currentTags, tag].join(' ')
}

function useArticleOverviewValue({
	allArticles,
	featuredArticleEnabled = false,
	customFilterFunction,
	readMoreLabel = 'Read more',
	readMoreAriaLabel = 'Read more about',
	searchEnabled,
	filter,
	setFilter,
}: ArticleOverviewSourceProps & {
	searchEnabled: boolean
	filter: string
	setFilter: (filter: string) => Promise<void>
}): ArticleOverviewContextProps {
	const [itemsToShow, setItemsToShow] = useState(PAGE_SIZE)

	return useMemo(() => {
		const articles = customFilterFunction
			? customFilterFunction(allArticles, filter)
			: filterArticles(allArticles, filter)

		const isFeatured = featuredArticleEnabled && filter.length === 0
		const featuredArticle = isFeatured ? articles[0] : undefined
		const listedArticles = featuredArticle ? articles.slice(1) : articles

		return {
			state: {
				articles,
				featuredArticle,
				visibleArticles: listedArticles.slice(0, itemsToShow),
				hasMore: itemsToShow < listedArticles.length,
				tags: nonNullable([
					...new Set(allArticles.flatMap((article) => article.tags)),
				]),
				filter,
			},
			actions: {
				setFilter,
				toggleFilter: (tag) => setFilter(toggleTag(filter, tag)),
				resetFilter: () => setFilter(''),
				loadMore: () => setItemsToShow((i) => i + PAGE_SIZE),
			},
			meta: {
				searchEnabled,
				featuredArticleEnabled,
				readMoreLabel,
				readMoreAriaLabel,
			},
		}
	}, [
		allArticles,
		customFilterFunction,
		featuredArticleEnabled,
		filter,
		itemsToShow,
		readMoreAriaLabel,
		readMoreLabel,
		searchEnabled,
		setFilter,
	])
}

function ArticleOverviewProviderLocal({
	children,
	...props
}: Omit<ArticleOverviewProviderProps, 'searchEnabled'>) {
	const [filter, setFilterState] = useState('')

	const setFilter = useCallback(async (next: string) => {
		setFilterState(next)
	}, [])

	return (
		<ArticleOverviewContext
			value={useArticleOverviewValue({
				...props,
				searchEnabled: false,
				filter,
				setFilter,
			})}
		>
			{children}
		</ArticleOverviewContext>
	)
}

function ArticleOverviewProviderWithSearch({
	children,
	...props
}: Omit<ArticleOverviewProviderProps, 'searchEnabled'>) {
	const [params, setParams] = useQueryStates({
		search: parseAsString,
	})

	const setFilter = useCallback(
		async (next: string) => {
			await setParams({ search: next })
		},
		[setParams],
	)

	return (
		<ArticleOverviewContext
			value={useArticleOverviewValue({
				...props,
				searchEnabled: true,
				filter: params.search ?? '',
				setFilter,
			})}
		>
			{children}
		</ArticleOverviewContext>
	)
}

export function ArticleOverviewProvider({
	searchEnabled = false,
	...props
}: ArticleOverviewProviderProps) {
	if (searchEnabled) return <ArticleOverviewProviderWithSearch {...props} />

	return <ArticleOverviewProviderLocal {...props} />
}

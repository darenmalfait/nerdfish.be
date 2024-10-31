'use client'

import * as React from 'react'
import { nonNullable } from '../../utils'
import { filterArticles } from './utils'

export type Article = {
	id: string
	title: string
	image?: {
		src?: string
		alt?: string
	}
	href: string
	excerpt?: string
	tags?: string[]
	category?: string
	date?: string
}

interface ArticleOverviewContextProps {
	articles: Article[]
	searchEnabled: boolean
	tags: string[]
	featuredArticleEnabled: boolean
	filter: string
	toggleFilter: (tag: string) => void
	setFilter: (filter: string) => void
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

	const filteredArticles = React.useMemo(() => {
		return customFilterFunction
			? customFilterFunction(allArticles, filter)
			: filterArticles(allArticles, filter)
	}, [allArticles, customFilterFunction, filter])

	const toggleFilter = React.useCallback((tag: string) => {
		setFilter((current) => {
			// create a regexp so that we can replace multiple occurrences (`react node react`)
			const expression = new RegExp(tag, 'ig')

			const newQuery = expression.test(current)
				? current.replace(expression, '')
				: `${current} ${tag}`

			// trim and remove subsequent spaces (`react   node ` => `react node`)
			return newQuery.replace(/\s+/g, ' ').trim()
		})
	}, [])

	const tags = [
		...new Set(allArticles.flatMap((article) => article.tags)),
	].filter(nonNullable)

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
				}),
				[
					filteredArticles,
					toggleFilter,
					filter,
					tags,
					searchEnabled,
					featuredArticleEnabled,
				],
			)}
		>
			{children}
		</ArticleOverviewContext.Provider>
	)
}

'use client'

import {
	Button,
	EmptyState,
	EmptyStateActions,
	EmptyStateDescription,
	EmptyStateIcon,
	EmptyStateTitle,
	Input,
} from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import {
	ArticleCard,
	ArticleCardCategory,
	ArticleCardContent,
	ArticleCardImage,
	ArticleCardTitle,
} from '@nerdfish-website/ui/components'
import { NewspaperIcon, PlusIcon, SearchIcon } from '@nerdfish-website/ui/icons'
import { formatDate } from 'date-fns/format'
import { parseISO } from 'date-fns/parseISO'
import Image from 'next/image'
import * as React from 'react'
import { nonNullable } from '../../utils'
import {
	HighlightCard,
	HighlightCardCategory,
	HighlightCardContent,
	HighlightCardCTA,
	HighlightCardDescription,
	HighlightCardImage,
	HighlightCardSubtitle,
	HighlightCardTitle,
} from '../highlight-card'
import { TagFilter } from '../tag-filter'
import {
	type Article,
	ArticleOverviewProvider,
	useArticleOverview,
} from './article-overview-provider'

const PAGE_SIZE = 6

export const ArticleOverviewSearch = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const { searchEnabled } = useArticleOverview()

	if (!searchEnabled) return null

	return (
		<div
			className={cx(
				'mb-2xl gap-x-md lg:pb-xl relative mx-auto grid h-auto grid-cols-4 justify-center md:grid-cols-8 lg:mb-0 lg:grid-cols-12',
				className,
			)}
			ref={ref}
			{...props}
		/>
	)
})
ArticleOverviewSearch.displayName = 'ArticleOverviewSearch'

export const ArticleOverviewSearchImage = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & {
		image?: Article['image'] | null
	}
>(({ children, image, ...props }, ref) => {
	if (!image?.src) return null

	return (
		<div
			className="mb-lg px-lg col-span-full lg:col-span-5 lg:col-start-7 lg:mb-0"
			ref={ref}
			{...props}
		>
			<Image
				className="rounded-xl"
				src={image.src}
				width={550}
				height={550}
				loading="eager"
				alt={image.alt ?? ''}
			/>
			{children}
		</div>
	)
})
ArticleOverviewSearchImage.displayName = 'ArticleOverviewSearchImage'

export const ArticleOverviewSearchContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
	const { filter, setFilter } = useArticleOverview()

	return (
		<div
			className={cx(
				'pt-lg col-span-5 lg:row-start-1 lg:flex lg:h-full lg:flex-col',
				className,
			)}
			ref={ref}
			{...props}
		>
			<div className="flex flex-auto flex-col justify-center">
				{children}

				<Input
					type="search"
					value={filter}
					onChange={(event) => {
						setFilter(event.currentTarget.value.toLowerCase())
					}}
					className="shadow-outline"
					name="q"
					placeholder="Search"
					icon={SearchIcon}
					inputSize="lg"
				/>
			</div>
		</div>
	)
})
ArticleOverviewSearchContent.displayName = 'ArticleOverviewSearchContent'

export const ArticleOverviewFilter = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & {
		title?: string
	}
>(({ children, className, title, ...props }, ref) => {
	const {
		searchEnabled,
		articles,
		filter,
		tags,
		toggleFilter,
		featuredArticleEnabled,
	} = useArticleOverview()

	if (!searchEnabled) return null

	const isSearching = filter.length > 0

	const enabledTags =
		isSearching || !featuredArticleEnabled
			? [...new Set(articles.flatMap((article) => article.tags))].filter(
					nonNullable,
				)
			: tags

	const selectedTags = tags.filter((tag) =>
		filter.split(' ').some((term) => term.toLowerCase() === tag.toLowerCase()),
	)

	return (
		<div ref={ref} className={cx('mb-lg', className)} {...props}>
			<TagFilter
				title={title ?? 'Filter articles by topic'}
				tags={tags}
				enabledTags={enabledTags}
				onToggleTag={toggleFilter}
				selectedTags={selectedTags}
			/>
		</div>
	)
})
ArticleOverviewFilter.displayName = 'ArticleOverviewFilter'

function ShowMoreButton({
	indexToShow,
	onClick,
}: {
	indexToShow: number
	onClick: () => void
}) {
	const { filter, featuredArticleEnabled, articles } = useArticleOverview()

	const isSearching = filter.length > 0

	const hasMorePosts =
		isSearching || !featuredArticleEnabled
			? indexToShow < articles.length
			: indexToShow < articles.length - 1

	if (!hasMorePosts) return null

	return (
		<div className="mt-2xl flex w-full justify-center">
			<Button size="xl" variant="outline" onClick={onClick}>
				<span className="mr-sm">Load more</span> <PlusIcon className="size-4" />
			</Button>
		</div>
	)
}

const FeaturedArticle = ({ article }: { article?: Article }) => {
	const { featuredArticleEnabled, filter } = useArticleOverview()

	if (!featuredArticleEnabled || !article) return null
	if (filter.length > 0) return null

	return (
		<HighlightCard href={article.href} className="mb-xl" title={article.title}>
			<HighlightCardContent>
				<HighlightCardCategory value={article.category} />
				<HighlightCardTitle>{article.title}</HighlightCardTitle>
				<HighlightCardSubtitle>
					{article.date
						? `${formatDate(parseISO(article.date), 'PPP')}`
						: 'TBA'}
				</HighlightCardSubtitle>
				<HighlightCardDescription>{article.excerpt}</HighlightCardDescription>
				<HighlightCardCTA category={article.category} href={article.href}>
					Read more
				</HighlightCardCTA>
			</HighlightCardContent>
			<HighlightCardImage src={article.image?.src} />
		</HighlightCard>
	)
}

export const ArticleOverviewContentGrid = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
	const { articles, featuredArticleEnabled, filter } = useArticleOverview()
	const [indexToShow, setIndexToShow] = React.useState(PAGE_SIZE)

	const isSearching = filter.length > 0

	const featured = articles.length > 0 ? articles[0] : undefined

	const filteredArticles = React.useMemo(
		() =>
			isSearching || !featuredArticleEnabled
				? articles
				: articles.filter((p) => p.id !== featured?.id),
		[isSearching, featuredArticleEnabled, articles, featured?.id],
	)

	const articlesToShow = filteredArticles.slice(0, indexToShow)

	return (
		<div ref={ref} {...props}>
			<FeaturedArticle article={featured} />

			<ul className="gap-x-lg gap-y-xl grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
				{children}
				{articlesToShow.map((article) => {
					return (
						<li key={article.id} className="col-span-4">
							<ArticleCard href={article.href} title={article.title}>
								<ArticleCardImage
									src={article.image?.src}
									category={article.category}
								/>
								<ArticleCardContent>
									<ArticleCardCategory>{article.category}</ArticleCardCategory>
									<ArticleCardTitle>{article.title}</ArticleCardTitle>
								</ArticleCardContent>
							</ArticleCard>
						</li>
					)
				})}
			</ul>

			<ShowMoreButton
				indexToShow={indexToShow}
				onClick={() => setIndexToShow((i) => i + PAGE_SIZE)}
			/>
		</div>
	)
})
ArticleOverviewContentGrid.displayName = 'ArticleOverviewContentGrid'

export const ArticlesOverviewEmptyState = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & {
		icon?: React.ElementType
		title?: string
		description?: string
		clearSearch?: string
	}
>(
	(
		{ icon: Icon, title, description, clearSearch, className, ...props },
		ref,
	) => {
		const { setFilter, articles } = useArticleOverview()

		if (articles.length > 0) return null

		return (
			<div
				ref={ref}
				className={cx('pt-xl !col-span-full', className)}
				{...props}
			>
				<EmptyState>
					<EmptyStateIcon>{Icon ? <Icon /> : <NewspaperIcon />}</EmptyStateIcon>
					<EmptyStateTitle>{title ?? 'No articles found'}</EmptyStateTitle>
					<EmptyStateDescription>
						{description ?? 'Try searching for something else.'}
					</EmptyStateDescription>
					<EmptyStateActions>
						<Button onClick={() => setFilter('')}>
							{clearSearch ?? 'Clear search'}
						</Button>
					</EmptyStateActions>
				</EmptyState>
			</div>
		)
	},
)
ArticlesOverviewEmptyState.displayName = 'ArticlesOverviewEmptyState'

export const ArticleOverview = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> &
		React.ComponentPropsWithoutRef<typeof ArticleOverviewProvider>
>(
	(
		{
			allArticles,
			customFilterFunction,
			searchEnabled,
			featuredArticleEnabled,
			...props
		},
		ref,
	) => {
		return (
			<ArticleOverviewProvider
				allArticles={allArticles}
				customFilterFunction={customFilterFunction}
				searchEnabled={searchEnabled}
				featuredArticleEnabled={featuredArticleEnabled}
			>
				<div ref={ref} {...props} />
			</ArticleOverviewProvider>
		)
	},
)

ArticleOverview.displayName = 'ArticleOverview'

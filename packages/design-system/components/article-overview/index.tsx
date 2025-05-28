'use client'

import { nonNullable } from '@repo/lib/utils/array'
import { cx } from '@repo/lib/utils/base'
import Image from 'next/image'
import * as React from 'react'
import { NewspaperIcon, PlusIcon, SearchIcon } from '../../icons'
import {
	ArticleCard,
	ArticleCardCategory,
	ArticleCardContent,
	ArticleCardDescription,
	ArticleCardImage,
	ArticleCardTitle,
} from '../article-card'
import {
	HighlightCard,
	HighlightCardCTA,
	HighlightCardCategory,
	HighlightCardContent,
	HighlightCardDescription,
	HighlightCardImage,
	HighlightCardTitle,
} from '../highlight-card'
import { TagFilter, TagFilterTitle } from '../tag-filter'
import {
	Button,
	EmptyState,
	EmptyStateActions,
	EmptyStateDescription,
	EmptyStateIcon,
	EmptyStateTitle,
	Input,
} from '../ui'
import {
	ArticleOverviewProvider,
	useArticleOverview,
} from './article-overview-provider'
import { type Article } from './types'

export type * from './types'

export interface ArticleOverviewSearchProps
	extends React.ComponentProps<'div'> {
	children: React.ReactNode
}

export function ArticleOverviewSearch({
	children,
	className,
	...props
}: ArticleOverviewSearchProps) {
	const { searchEnabled } = useArticleOverview()

	if (!searchEnabled) return null

	return (
		<div
			className={cx(
				'mb-2xl gap-x-md lg:pb-xl relative mx-auto grid h-auto grid-cols-4 justify-center md:grid-cols-8 lg:mb-0 lg:grid-cols-12',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	)
}

export interface ArticleOverviewSearchImageProps
	extends React.ComponentProps<'div'> {
	image?: Article['image'] | null
}

export function ArticleOverviewSearchImage({
	children,
	image,
	...props
}: ArticleOverviewSearchImageProps) {
	if (!image?.src) return null

	return (
		<div
			className="mb-lg px-lg col-span-full lg:col-span-5 lg:col-start-7 lg:mb-0"
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
}

export interface ArticleOverviewSearchContentProps
	extends React.ComponentProps<'div'> {
	inputLabel?: string
}

export function ArticleOverviewSearchContent({
	children,
	inputLabel,
	className,
	...props
}: ArticleOverviewSearchContentProps) {
	const { filter, setFilter } = useArticleOverview()

	return (
		<div
			className={cx(
				'col-span-5 lg:row-start-1 lg:flex lg:h-full lg:flex-col',
				className,
			)}
			{...props}
		>
			<div className="flex flex-auto flex-col justify-center">
				{children}

				<label>
					<span className="sr-only">{inputLabel ?? 'Search'}</span>

					<Input
						type="search"
						value={filter}
						onChange={(event) => {
							return setFilter(event.currentTarget.value.toLowerCase())
						}}
						className="shadow-outline"
						name="q"
						placeholder={inputLabel ?? 'Search'}
						icon={SearchIcon}
						inputSize="lg"
					/>
				</label>
			</div>
		</div>
	)
}

export interface ArticleOverviewFilterProps
	extends React.ComponentProps<'div'> {
	title?: string
}

export function ArticleOverviewFilter({
	children,
	className,
	title,
	...props
}: ArticleOverviewFilterProps) {
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
			? nonNullable([...new Set(articles.flatMap((article) => article.tags))])
			: tags

	const selectedTags = tags.filter((tag) =>
		filter.split(' ').some((term) => term.toLowerCase() === tag.toLowerCase()),
	)

	return (
		<div className={cx('mb-xl', className)} {...props}>
			<TagFilter
				tags={tags}
				enabledTags={enabledTags}
				onToggleTag={toggleFilter}
				selectedTags={selectedTags}
			>
				<TagFilterTitle>{title ?? 'Filter articles by topic'}</TagFilterTitle>
			</TagFilter>
		</div>
	)
}

export interface ArticleOverviewLoadMoreButtonProps
	extends React.ComponentProps<'div'> {
	children: string
}

export function ArticleOverviewLoadMoreButton({
	children,
	className,
	...props
}: ArticleOverviewLoadMoreButtonProps) {
	const { filter, featuredArticleEnabled, articles, loadMore, itemsToShow } =
		useArticleOverview()

	const isSearching = filter.length > 0

	const hasMorePosts =
		isSearching || !featuredArticleEnabled
			? itemsToShow < articles.length
			: itemsToShow < articles.length - 1

	if (!hasMorePosts) return null

	return (
		<div
			className={cx('mt-2xl flex w-full justify-center', className)}
			{...props}
		>
			<Button size="lg" variant="outline" onClick={loadMore}>
				<span className="mr-sm">{children}</span>{' '}
				<PlusIcon className="size-4" />
			</Button>
		</div>
	)
}

export interface FeaturedArticleProps
	extends Omit<React.ComponentProps<typeof HighlightCard>, 'title'> {
	article?: Article
	readMoreLabel?: string
	ariaLabel?: string
}

const FeaturedArticle = ({
	article,
	readMoreLabel,
	ariaLabel,
	className,
	...props
}: FeaturedArticleProps) => {
	const { featuredArticleEnabled, filter } = useArticleOverview()

	if (!featuredArticleEnabled || !article) return null
	if (filter.length > 0) return null

	return (
		<HighlightCard
			className={cx('mb-xl', className)}
			title={article.title}
			{...props}
		>
			<HighlightCardContent>
				<HighlightCardCategory value={article.category} />
				<HighlightCardTitle>{article.title}</HighlightCardTitle>
				<HighlightCardDescription>
					{article.description}
				</HighlightCardDescription>
				<HighlightCardCTA
					category={article.category}
					href={article.href}
					aria-label={ariaLabel}
				>
					{readMoreLabel ?? 'Read more'}
				</HighlightCardCTA>
			</HighlightCardContent>
			<HighlightCardImage
				src={article.image?.src}
				alt={article.image?.alt ?? article.title}
			/>
		</HighlightCard>
	)
}

export interface ArticleOverviewContentGridProps
	extends React.ComponentProps<'div'> {
	readMoreLabel?: string
	ariaLabel?: string
	maxColumns?: number
	custumArticleCard?: React.ComponentType<{ article: Article }>
}

export function ArticleOverviewContentGrid({
	children,
	readMoreLabel = 'Read more',
	ariaLabel = 'Read more about',
	maxColumns = 2,
	custumArticleCard: CustomArticleCard,
	...props
}: ArticleOverviewContentGridProps) {
	const { articles, featuredArticleEnabled, filter, itemsToShow } =
		useArticleOverview()

	const isSearching = filter.length > 0
	const featured = articles.length > 0 ? articles[0] : undefined

	const filteredArticles =
		isSearching || !featuredArticleEnabled
			? articles
			: articles.filter((p) => p.id !== featured?.id)

	const articlesToShow = filteredArticles.slice(0, itemsToShow)

	return (
		<div {...props}>
			<FeaturedArticle
				ariaLabel={ariaLabel}
				readMoreLabel={readMoreLabel}
				article={featured}
			/>

			<ul
				className={cx(
					'gap-x-lg gap-y-lg grid grid-cols-1',
					maxColumns > 1 && 'md:grid-cols-2',
					maxColumns > 2 && 'lg:grid-cols-3',
					maxColumns > 3 && 'xl:grid-cols-4',
				)}
			>
				{children}
				{articlesToShow.map((article) => {
					if (CustomArticleCard) {
						return <CustomArticleCard key={article.id} article={article} />
					}

					return (
						<li
							key={article.id}
							className="col-span-1 transition-all duration-300"
						>
							<ArticleCard href={article.href} title={article.title}>
								<ArticleCardImage
									alt={article.title}
									src={article.image?.src}
									category={article.category}
									readMoreLabel={readMoreLabel}
									base64Placeholder={article.base64Placeholder}
								/>
								<ArticleCardContent>
									<ArticleCardCategory>{article.category}</ArticleCardCategory>
									<ArticleCardTitle>{article.title}</ArticleCardTitle>

									<ArticleCardDescription>
										{article.description}
									</ArticleCardDescription>
								</ArticleCardContent>
							</ArticleCard>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export interface ArticlesOverviewEmptyStateProps
	extends React.ComponentProps<'div'> {
	icon?: React.ElementType
	title?: string
	description?: string
	clearSearch?: string
}

export function ArticlesOverviewEmptyState({
	icon: Icon,
	title,
	description,
	clearSearch,
	className,
	...props
}: ArticlesOverviewEmptyStateProps) {
	const { resetFilter, articles, searchEnabled } = useArticleOverview()

	if (!searchEnabled) return null
	if (articles.length > 0) return null

	return (
		<div className={cx('pt-xl !col-span-full', className)} {...props}>
			<EmptyState>
				<EmptyStateIcon>{Icon ? <Icon /> : <NewspaperIcon />}</EmptyStateIcon>
				<EmptyStateTitle>{title ?? 'No articles found'}</EmptyStateTitle>
				<EmptyStateDescription>
					{description ?? 'Try searching for something else.'}
				</EmptyStateDescription>
				<EmptyStateActions>
					<Button onClick={resetFilter}>{clearSearch ?? 'Clear search'}</Button>
				</EmptyStateActions>
			</EmptyState>
		</div>
	)
}

export type ArticleOverviewProps = React.ComponentProps<
	typeof ArticleOverviewProvider
>

export function ArticleOverview({
	allArticles,
	customFilterFunction,
	searchEnabled,
	featuredArticleEnabled,
	children,
	...props
}: ArticleOverviewProps) {
	return (
		<ArticleOverviewProvider
			allArticles={allArticles}
			customFilterFunction={customFilterFunction}
			searchEnabled={searchEnabled}
			featuredArticleEnabled={featuredArticleEnabled}
			{...props}
		>
			{children}
		</ArticleOverviewProvider>
	)
}

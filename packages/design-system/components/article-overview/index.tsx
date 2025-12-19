'use client'

import { Button } from '@nerdfish/react/button'
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@nerdfish/react/empty'
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from '@nerdfish/react/input-group'
import { nonNullable } from '@repo/lib/utils/array'
import { cn } from '@repo/lib/utils/class'
import Image from 'next/image'
import {
	type ComponentType,
	type ComponentProps,
	type ReactNode,
	type ElementType,
} from 'react'
import { NewspaperIcon, SearchIcon } from '../../icons'
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
	ArticleOverviewProvider,
	useArticleOverview,
} from './article-overview-provider'
import { type Article } from './types'

export type * from './types'

export interface ArticleOverviewSearchProps extends ComponentProps<'div'> {
	children: ReactNode
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
			className={cn(
				'mb-distant gap-x-friends lg:pb-acquaintances relative mx-auto grid h-auto grid-cols-4 justify-center md:grid-cols-8 lg:mb-0 lg:grid-cols-12',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	)
}

export interface ArticleOverviewSearchImageProps extends ComponentProps<'div'> {
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
			className="mb-casual px-casual col-span-full lg:col-span-5 lg:col-start-7 lg:mb-0"
			{...props}
		>
			<Image
				className="rounded-base"
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

export interface ArticleOverviewSearchContentProps extends ComponentProps<'div'> {
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
			className={cn(
				'col-span-5 lg:row-start-1 lg:flex lg:h-full lg:flex-col',
				className,
			)}
			{...props}
		>
			<div className="flex flex-auto flex-col justify-center">
				{children}

				<label>
					<span className="sr-only">{inputLabel ?? 'Search'}</span>

					<InputGroup>
						<InputGroupInput
							type="search"
							value={filter}
							onChange={(event) => {
								return setFilter(event.currentTarget.value.toLowerCase())
							}}
							className="border-border text-lg"
							name="q"
							placeholder={inputLabel ?? 'Search'}
							size="xl"
						/>
						<InputGroupAddon>
							<SearchIcon className="size-6" />
						</InputGroupAddon>
					</InputGroup>
				</label>
			</div>
		</div>
	)
}

export interface ArticleOverviewFilterProps extends ComponentProps<'div'> {
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
		<div className={cn('mb-acquaintances', className)} {...props}>
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

export interface ArticleOverviewLoadMoreButtonProps extends ComponentProps<'div'> {
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
			className={cn('mt-distant flex w-full justify-center', className)}
			{...props}
		>
			<Button size="lg" variant="secondary" onClick={loadMore}>
				{children}
			</Button>
		</div>
	)
}

export interface FeaturedArticleProps extends Omit<
	ComponentProps<typeof HighlightCard>,
	'title'
> {
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
			className={cn('mb-acquaintances', className)}
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

export interface ArticleOverviewContentGridProps extends ComponentProps<'div'> {
	readMoreLabel?: string
	ariaLabel?: string
	maxColumns?: number
	custumArticleCard?: ComponentType<{ article: Article }>
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
				className={cn(
					'gap-x-acquaintances gap-y-acquaintances grid grid-cols-1',
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

export interface ArticlesOverviewEmptyStateProps extends ComponentProps<'div'> {
	icon?: ElementType
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
		<div
			className={cn('pt-acquaintances col-span-full!', className)}
			{...props}
		>
			<Empty>
				<EmptyHeader>
					<EmptyMedia variant="icon">
						{Icon ? <Icon /> : <NewspaperIcon />}
					</EmptyMedia>
					<EmptyTitle>{title ?? 'No articles found'}</EmptyTitle>
					<EmptyDescription>
						{description ?? 'Try searching for something else.'}
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<Button onClick={resetFilter}>{clearSearch ?? 'Clear search'}</Button>
				</EmptyContent>
			</Empty>
		</div>
	)
}

export type ArticleOverviewProps = ComponentProps<
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

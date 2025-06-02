/* eslint-disable complexity */
'use client'

import {
	ArticleCard,
	ArticleCardDescription,
	ArticleCardTitle,
} from '@repo/design-system/components/article-card'
import {
	type Article,
	ArticleOverview,
	ArticleOverviewContentGrid,
	ArticleOverviewFilter,
	ArticleOverviewLoadMoreButton,
	ArticleOverviewSearch,
	ArticleOverviewSearchContent,
	ArticleOverviewSearchImage,
	ArticlesOverviewEmptyState,
} from '@repo/design-system/components/article-overview'
import {
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/design-system/components/section'
import { Badge, H1, Link } from '@repo/design-system/components/ui'
import { useTranslations } from '@repo/i18n/client'
import { type PartialDeep } from '@repo/lib/types'
import { cx } from '@repo/lib/utils/base'
import { type Wiki } from 'content-collections'
import { env } from 'env'
import * as React from 'react'
import { filterWiki, mapWikiToArticle } from '../../utils'
import { type ImageType } from '~/app/types'

function Tag({ tag }: { tag: string }) {
	const isClient = typeof window !== 'undefined'

	// take url without query params
	const currentUrl = new URL(
		isClient ? window.location.href : env.NEXT_PUBLIC_URL,
	)
	const urlWithoutQueryParams = currentUrl.pathname

	return (
		<Link href={`${urlWithoutQueryParams}?search=${tag}`}>
			<Badge
				className="hover:bg-foreground hover:text-background"
				variant="secondary"
			>
				{tag}
			</Badge>
		</Link>
	)
}

export interface ArticleCardTagsProps
	extends Omit<React.ComponentProps<'div'>, 'children'> {
	tags?: string[]
}

export function ArticleCardTags({
	className,
	tags,
	...props
}: ArticleCardTagsProps) {
	if (!tags) return null

	return (
		<div {...props} className={cx('gap-sm mb-sm flex flex-wrap', className)}>
			{tags.map((tag) => (
				<Tag key={tag} tag={tag} />
			))}
		</div>
	)
}

function WikiOverviewArticleCard({ article }: { article: Article }) {
	return (
		<div className="gap-sm mb-lg flex flex-col">
			<ArticleCardTags tags={article.tags} />
			<ArticleCard href={article.href} className="group/article-card">
				<ArticleCardTitle className="group-hover/article-card:text-accent line-clamp-2 max-w-3xl transition-colors">
					{article.title}
				</ArticleCardTitle>
				<ArticleCardDescription className="line-clamp-3 max-w-3xl">
					{article.description}
				</ArticleCardDescription>
			</ArticleCard>
		</div>
	)
}

export interface WikiOverviewContentProps {
	searchEnabled?: boolean
	featuredEnabled?: boolean
	items: PartialDeep<Wiki>[]
	header?: {
		title?: string
		subtitle?: string
		image?: ImageType
		link?: string
	} | null
	children?: React.ReactNode
}

export function WikiOverviewContent({
	searchEnabled,
	featuredEnabled,
	items,
	header,
	children,
}: WikiOverviewContentProps) {
	const t = useTranslations('wiki.overview')
	const articles = React.useMemo(() => mapWikiToArticle(items), [items])

	const filterArticles = React.useCallback(
		(toFilter: Article[], searchString: string) => {
			const toFilterIds = new Set(toFilter.map((article) => article.id))
			const wikis = items.filter((wiki) => wiki.id && toFilterIds.has(wiki.id))

			return mapWikiToArticle(filterWiki(wikis, searchString))
		},
		[items],
	)

	return (
		<ArticleOverview
			allArticles={articles}
			searchEnabled={searchEnabled}
			featuredArticleEnabled={featuredEnabled}
			customFilterFunction={filterArticles}
		>
			<ArticleOverviewSearch>
				<ArticleOverviewSearchImage
					image={{
						src: header?.image?.src ?? undefined,
						alt: header?.image?.alt ?? header?.title ?? '',
					}}
				/>
				<ArticleOverviewSearchContent inputLabel={t('search')}>
					<SectionHeader>
						<H1 variant="primary" className="mb-lg">
							{header?.title}
						</H1>
						<SectionHeaderSubtitle>
							{header?.subtitle ?? undefined}
						</SectionHeaderSubtitle>
					</SectionHeader>
				</ArticleOverviewSearchContent>
			</ArticleOverviewSearch>

			<ArticleOverviewFilter title={t('filterByTopic')} />

			{searchEnabled ? null : (
				<SectionHeader
					cta={{
						title: t('seeAll'),
						url: header?.link ?? '',
					}}
				>
					<SectionHeaderTitle>{header?.title}</SectionHeaderTitle>
					<SectionHeaderSubtitle>
						{header?.subtitle ?? undefined}
					</SectionHeaderSubtitle>
				</SectionHeader>
			)}

			{children ?? (
				<ArticleOverviewContentGrid
					maxColumns={1}
					readMoreLabel={t('readMore')}
					ariaLabel={t('readMoreAbout', {
						title: header?.title ?? '',
					})}
					custumArticleCard={WikiOverviewArticleCard}
				>
					<ArticlesOverviewEmptyState />
				</ArticleOverviewContentGrid>
			)}

			<ArticleOverviewLoadMoreButton>
				{t('loadMore')}
			</ArticleOverviewLoadMoreButton>
		</ArticleOverview>
	)
}

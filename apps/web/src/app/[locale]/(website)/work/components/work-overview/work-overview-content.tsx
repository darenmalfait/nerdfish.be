/* eslint-disable complexity */
'use client'

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
import { useTranslations } from '@repo/i18n/client'
import { type PartialDeep } from '@repo/lib/types'
import { type Project } from 'content-collections'
import { type ReactNode, useCallback, useMemo } from 'react'
import { filterWork, mapWorkToArticle } from '../../utils'
import { type ImageType } from '~/app/types'

export interface WorkOverviewContentProps {
	children?: ReactNode
	searchEnabled?: boolean
	featuredEnabled?: boolean
	items: PartialDeep<Project>[]
	header?: {
		title?: string
		subtitle?: string
		image?: ImageType
		link?: string
	} | null
}

export function WorkOverviewContent({
	searchEnabled,
	featuredEnabled,
	items,
	header,
	children,
}: WorkOverviewContentProps) {
	const t = useTranslations('work.overview')
	const articles = useMemo(() => items.map(mapWorkToArticle), [items])

	const filterArticles = useCallback(
		(toFilter: Article[], searchString: string) => {
			const toFilterIds = new Set(toFilter.map((article) => article.id))
			const works = items.filter((post) => post.id && toFilterIds.has(post.id))

			return filterWork(works, searchString).map(mapWorkToArticle)
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
						<h1 className="typography-heading-lg mb-casual">{header?.title}</h1>
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
					readMoreLabel={t('readMore')}
					ariaLabel={t('readMoreAbout', {
						title: header?.title ?? '',
					})}
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

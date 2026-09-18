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
import { type ReactNode } from 'react'
import { type ImageType } from '~/features/shared'

export interface BlogOverviewContentProps {
	searchEnabled?: boolean
	featuredEnabled?: boolean
	items: Article[]
	header?: {
		title?: string
		subtitle?: string
		image?: ImageType
		link?: string
	} | null
	children?: ReactNode
	customFilterFunction?: (
		articles: Article[],
		searchString: string,
	) => Article[]
}

export function BlogOverviewContent({
	searchEnabled,
	featuredEnabled,
	items,
	header,
	children,
	customFilterFunction,
}: BlogOverviewContentProps) {
	const t = useTranslations('blog.overview')

	return (
		<ArticleOverview
			allArticles={items}
			searchEnabled={searchEnabled}
			featuredArticleEnabled={featuredEnabled}
			customFilterFunction={customFilterFunction}
		>
			<ArticleOverviewSearch>
				<ArticleOverviewSearchImage
					image={{
						src: header?.image?.src ?? '',
						alt: header?.image?.alt ?? header?.title ?? '',
					}}
				/>
				<ArticleOverviewSearchContent inputLabel={t('search')}>
					<SectionHeader>
						<h1 className="typography-heading mb-casual">{header?.title}</h1>
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

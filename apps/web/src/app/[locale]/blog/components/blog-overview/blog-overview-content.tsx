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
import { H1 } from '@repo/design-system/components/ui'
import { type PartialDeep } from '@repo/design-system/lib/utils/types'
import { useTranslations } from '@repo/i18n/client'
import { type Post } from 'content-collections'
import * as React from 'react'
import { filterBlog, mapBlogToArticle } from '../../utils'
import { type ImageType } from '~/app/types'

export interface BlogOverviewContentProps {
	searchEnabled?: boolean
	featuredEnabled?: boolean
	items: PartialDeep<Post>[]
	header?: {
		title?: string
		subtitle?: string
		image?: ImageType
		link?: string
	} | null
	children?: React.ReactNode
}

export function BlogOverviewContent({
	searchEnabled,
	featuredEnabled,
	items,
	header,
	children,
}: BlogOverviewContentProps) {
	const t = useTranslations('blog.overview')
	const articles = React.useMemo(() => mapBlogToArticle(items), [items])

	const filterArticles = React.useCallback(
		(toFilter: Article[], searchString: string) => {
			const toFilterIds = new Set(toFilter.map((article) => article.id))
			const blogs = items.filter((post) => post.id && toFilterIds.has(post.id))

			return mapBlogToArticle(filterBlog(blogs, searchString))
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
						src: header?.image?.src ?? '',
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

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
import { type Wiki } from 'content-collections'
import * as React from 'react'
import { filterWiki, mapWikiToArticle } from '../../utils'
import { type Block, type PageBlocksWiki } from '~/app/cms/types'

export function WikiOverview({
	searchEnabled,
	featuredEnabled,
	items,
	header,
	children,
}: {
	children?: React.ReactNode
	searchEnabled: boolean
	featuredEnabled: boolean
	items: PartialDeep<Wiki>[]
	header: Block<PageBlocksWiki>['header']
}) {
	const t = useTranslations('wiki')
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

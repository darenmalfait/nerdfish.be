'use client'

import type { PartialDeep } from '@repo/lib/utils'
import {
	type Article,
	ArticleOverview,
	ArticleOverviewFilter,
	ArticleOverviewLoadMoreButton,
	ArticleOverviewSearch,
	ArticleOverviewSearchContent,
	ArticleOverviewSearchImage,
} from '@repo/ui/components/article-overview'
import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/ui/components/section'
import * as React from 'react'
import type { Block, PageBlocksWork, Work } from '~/app/cms/types'
import { useTranslation } from '~/app/i18n/translation-provider'
import { filterWork, mapWorkToArticle } from '../utils'

export function BlockLayout({
	searchEnabled,
	featuredEnabled,
	items,
	header,
	children,
}: {
	children?: React.ReactNode
	searchEnabled: boolean
	featuredEnabled: boolean
	items: PartialDeep<Work>[]
	header: Block<PageBlocksWork>['header']
}) {
	const { t } = useTranslation()
	const articles = React.useMemo(() => mapWorkToArticle(items), [items])

	const filterArticles = React.useCallback(
		(toFilter: Article[], searchString: string) => {
			const toFilterIds = new Set(toFilter.map((article) => article.id))
			const works = items.filter((post) => post.id && toFilterIds.has(post.id))

			return mapWorkToArticle(filterWork(works, searchString))
		},
		[items]
	)

	return (
		<Section>
			<ArticleOverview
				allArticles={articles}
				searchEnabled={searchEnabled}
				featuredArticleEnabled={featuredEnabled}
				customFilterFunction={filterArticles}
			>
				<ArticleOverviewSearch>
					<ArticleOverviewSearchImage
						image={{
							src: header?.image ?? undefined,
							alt: header?.title ?? undefined,
						}}
					/>
					<ArticleOverviewSearchContent>
						<SectionHeader>
							<SectionHeaderTitle>{header?.title}</SectionHeaderTitle>
							<SectionHeaderSubtitle>
								{header?.subtitle ?? undefined}
							</SectionHeaderSubtitle>
						</SectionHeader>
					</ArticleOverviewSearchContent>
				</ArticleOverviewSearch>

				<ArticleOverviewFilter />

				{searchEnabled ? null : (
					<SectionHeader
						cta={{
							title: t('global.allArticles'),
							url: header?.link ?? '',
						}}
					>
						<SectionHeaderTitle>{header?.title}</SectionHeaderTitle>
						<SectionHeaderSubtitle>
							{header?.subtitle ?? undefined}
						</SectionHeaderSubtitle>
					</SectionHeader>
				)}

				{children}

				<ArticleOverviewLoadMoreButton>
					{t('global.readMore')}
				</ArticleOverviewLoadMoreButton>
			</ArticleOverview>
		</Section>
	)
}

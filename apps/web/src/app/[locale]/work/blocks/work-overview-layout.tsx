'use client'

import { type PartialDeep } from '@repo/lib/utils'
import {
	Section,
	SectionHeaderTitle,
	SectionHeader,
	SectionHeaderSubtitle,
	ArticleOverviewLoadMoreButton,
	ArticleOverviewSearchContent,
	ArticleOverviewSearch,
	ArticleOverviewFilter,
	type Article,
	ArticleOverviewSearchImage,
	ArticleOverview,
} from '@repo/ui/components'
import * as React from 'react'
import { filterWork, mapWorkToArticle } from '../utils'
import { type Work, type Block, type PageBlocksWork } from '~/app/cms'
import { useTranslation } from '~/app/i18n'

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
		[items],
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

				{!searchEnabled ? (
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
				) : null}

				{children}

				<ArticleOverviewLoadMoreButton>
					{t('global.readMore')}
				</ArticleOverviewLoadMoreButton>
			</ArticleOverview>
		</Section>
	)
}

'use client'

import { type PartialDeep } from '@nerdfish-website/lib/utils'
import { Section } from '@nerdfish-website/ui/components'
import * as React from 'react'
import { filterBlog, mapBlogToArticle } from '../utils'
import { type Blog, type Block, type PageBlocksBlog } from '~/app/cms'
import {
	ArticleOverview,
	SectionHeaderTitle,
	SectionHeader,
	SectionHeaderSubtitle,
	ArticleOverviewSearchImage,
} from '~/app/common'
import {
	ArticleOverviewFilter,
	ArticleOverviewSearch,
	ArticleOverviewSearchContent,
} from '~/app/common/components/article-overview/article-overview'
import { type Article } from '~/app/common/components/article-overview/article-overview-provider'

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
	items: PartialDeep<Blog>[]
	header: Block<PageBlocksBlog>['header']
}) {
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
							<SectionHeaderTitle animatedText={header?.title ?? undefined} />
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
							title: 'See all articles',
							url: header?.link ?? '',
						}}
					>
						<SectionHeaderTitle animatedText={header?.title ?? undefined} />
						<SectionHeaderSubtitle>
							{header?.subtitle ?? undefined}
						</SectionHeaderSubtitle>
					</SectionHeader>
				) : null}

				{children}
			</ArticleOverview>
		</Section>
	)
}

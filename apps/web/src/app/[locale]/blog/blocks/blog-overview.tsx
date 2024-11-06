import { Skeleton } from '@nerdfish/ui'
import {
	ArticleCard,
	ArticleCardCategory,
	ArticleCardContent,
	ArticleCardImage,
	ArticleCardTitle,
} from '@nerdfish-website/ui/components'
import * as React from 'react'
import { getBlogPosts } from '../api'
import { filterBlog } from '../utils'
import { BlockLayout } from './blog-overview-layout'
import { type Block, type PageBlocksBlog } from '~/app/cms'
import {
	ArticleOverviewContentGrid,
	ArticlesOverviewEmptyState,
} from '~/app/common'

export async function BlogOverviewBlockContent(data: Block<PageBlocksBlog>) {
	const { header, searchEnabled, featuredEnabled, tags, count, locale } = data
	const blogs = (await getBlogPosts({ locale })) ?? []

	const posts = count ? blogs.slice(0, count) : blogs
	const items = filterBlog(posts, tags?.join(' ') ?? '')

	return (
		<BlockLayout
			searchEnabled={searchEnabled ?? false}
			featuredEnabled={featuredEnabled ?? false}
			items={items}
			header={header}
		>
			<ArticleOverviewContentGrid>
				<ArticlesOverviewEmptyState />
			</ArticleOverviewContentGrid>
		</BlockLayout>
	)
}

export async function BlogOverviewBlock(data: Block<PageBlocksBlog>) {
	const { header, searchEnabled, featuredEnabled } = data

	return (
		<React.Suspense
			fallback={
				<BlockLayout
					searchEnabled={searchEnabled ?? false}
					featuredEnabled={featuredEnabled ?? false}
					items={[]}
					header={header}
				>
					{featuredEnabled ? (
						<Skeleton className="mb-xl rounded-semi aspect-[16/9] h-full" />
					) : null}
					<ArticleOverviewContentGrid>
						{Array.from({ length: 3 }).map((_, i) => (
							<li key={i} className="col-span-4">
								<ArticleCard>
									<ArticleCardImage />
									<ArticleCardContent>
										<ArticleCardCategory className="w-16">
											<Skeleton className="bg-transparent" />
										</ArticleCardCategory>
										<ArticleCardTitle>
											<Skeleton count={2} />
										</ArticleCardTitle>
									</ArticleCardContent>
								</ArticleCard>
							</li>
						))}
					</ArticleOverviewContentGrid>
				</BlockLayout>
			}
		>
			<BlogOverviewBlockContent {...data} />
		</React.Suspense>
	)
}

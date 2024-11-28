import { Skeleton } from '@nerdfish/ui'
import type { PartialDeep } from '@repo/lib/utils'
import {
	type Blog as BlogJsonLd,
	JsonLd,
	type WithContext,
} from '@repo/seo/json-ld'
import {
	ArticleCard,
	ArticleCardCategory,
	ArticleCardContent,
	ArticleCardImage,
	ArticleCardTitle,
	ArticleOverviewContentGrid,
	ArticlesOverviewEmptyState,
} from '@repo/ui/components'
import * as React from 'react'
import type { Block, Blog, PageBlocksBlog } from '~/app/cms/types'
import { getBlogPosts } from '../api'
import { filterBlog } from '../utils'
import { BlockLayout } from './blog-overview-layout'

function isSameBlog(blog: PartialDeep<Blog>, relatedTo?: PartialDeep<Blog>) {
	return blog._sys?.relativePath === relatedTo?._sys?.relativePath
}

export async function BlogOverviewBlockContent(
	data: Block<PageBlocksBlog> & {
		relatedTo?: PartialDeep<Blog>
	}
) {
	const {
		header,
		searchEnabled,
		featuredEnabled,
		tags,
		count,
		locale,
		relatedTo,
	} = data
	const jsonLd: WithContext<BlogJsonLd> = {
		'@type': 'Blog',
		'@context': 'https://schema.org',
	}

	const localizedBlogs = (await getBlogPosts({ locale })) ?? []

	const relatedBlogs =
		relatedTo &&
		localizedBlogs
			.filter((blog) => !isSameBlog(blog, relatedTo))
			.filter((blog) => blog.tags?.some((tag) => relatedTo.tags?.includes(tag)))

	const blogs = relatedTo
		? relatedBlogs?.length
			? relatedBlogs
			: localizedBlogs.filter((blog) => !isSameBlog(blog, relatedTo))
		: localizedBlogs.filter((blog) => !isSameBlog(blog, relatedTo))

	const items = relatedTo ? blogs : filterBlog(blogs, tags?.join(' ') ?? '')

	const limitedBlogs = count ? items.slice(0, count) : items

	return (
		<>
			{searchEnabled ? <JsonLd code={jsonLd} /> : null}
			<BlockLayout
				searchEnabled={searchEnabled ?? false}
				featuredEnabled={featuredEnabled ?? false}
				items={limitedBlogs}
				header={header}
			>
				<ArticleOverviewContentGrid loadMoreLabel="read more">
					<ArticlesOverviewEmptyState />
				</ArticleOverviewContentGrid>
			</BlockLayout>
		</>
	)
}

export async function BlogOverviewBlock(
	data: Block<PageBlocksBlog> & {
		relatedTo?: PartialDeep<Blog>
	}
) {
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
						<Skeleton className="mb-xl aspect-[16/9] h-full rounded-container" />
					) : null}
					<ArticleOverviewContentGrid>
						{Array.from({ length: 2 }).map((_, i) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: its a skeleton, it's fine
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

import { Skeleton } from '@nerdfish/ui'
import { type PartialDeep } from '@repo/lib/utils/types'
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
} from '@repo/ui/components/article-card'
import { ArticleOverviewContentGrid } from '@repo/ui/components/article-overview'
import * as React from 'react'
import { getBlogPosts } from '../api'
import { filterBlog } from '../utils'
import { BlockLayout } from './blog-overview-layout'
import { type Block, type Blog, type PageBlocksBlog } from '~/app/cms/types'

function isSameBlog(blog: PartialDeep<Blog>, relatedTo?: PartialDeep<Blog>) {
	return blog._sys?.relativePath === relatedTo?._sys?.relativePath
}

export async function BlogOverviewBlockContent(
	data: Block<PageBlocksBlog> & {
		relatedTo?: PartialDeep<Blog>
	},
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
			.sort((a, b) => {
				// I want to get the index of the previous item, to be the first item in the array
				const relatedToIndex =
					localizedBlogs.findIndex(
						(blog) => blog._sys?.relativePath === relatedTo._sys?.relativePath,
					) - 2
				if (relatedToIndex < 0) return 0

				const aIndex = localizedBlogs.indexOf(a)
				const bIndex = localizedBlogs.indexOf(b)

				// Adjust indices to start after relatedTo
				const adjustedAIndex =
					(aIndex - relatedToIndex - 1 + localizedBlogs.length) %
					localizedBlogs.length
				const adjustedBIndex =
					(bIndex - relatedToIndex - 1 + localizedBlogs.length) %
					localizedBlogs.length

				return adjustedAIndex - adjustedBIndex
			})
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
			/>
		</>
	)
}

export async function BlogOverviewBlock(
	data: Block<PageBlocksBlog> & {
		relatedTo?: PartialDeep<Blog>
	},
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
						<Skeleton className="mb-xl rounded-container aspect-[16/9] h-full" />
					) : null}
					<ArticleOverviewContentGrid>
						{Array.from({ length: 2 }).map((_, i) => (
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

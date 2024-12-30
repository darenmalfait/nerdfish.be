import {
	ArticleCard,
	ArticleCardCategory,
	ArticleCardContent,
	ArticleCardImage,
	ArticleCardTitle,
} from '@repo/design-system/components/article-card'
import { ArticleOverviewContentGrid } from '@repo/design-system/components/article-overview'
import { Skeleton } from '@repo/design-system/components/ui'
import { type PartialDeep } from '@repo/design-system/lib/utils/types'
import {
	type Blog as BlogJsonLd,
	JsonLd,
	type WithContext,
} from '@repo/seo/json-ld'
import { type Post } from 'content-collections'
import * as React from 'react'
import { blog } from '../api'
import { filterBlog } from '../utils'
import { BlockLayout } from './blog-overview-layout'
import { type Block, type PageBlocksBlog } from '~/app/cms/types'

function isSameBlogPost(
	post: PartialDeep<Post>,
	relatedTo?: PartialDeep<Post>,
) {
	return post.slug === relatedTo?.slug
}

export async function BlogOverviewBlockContent(
	data: Block<PageBlocksBlog> & {
		relatedTo?: PartialDeep<Post>
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

	const localizedPosts = await blog.getPosts({ locale })

	const relatedBlogs =
		relatedTo &&
		localizedPosts
			.sort((a, b) => {
				// I want to get the index of the previous item, to be the first item in the array
				const relatedToIndex =
					localizedPosts.findIndex((post) => post.slug === relatedTo.slug) - 2
				if (relatedToIndex < 0) return 0

				const aIndex = localizedPosts.indexOf(a)
				const bIndex = localizedPosts.indexOf(b)

				// Adjust indices to start after relatedTo
				const adjustedAIndex =
					(aIndex - relatedToIndex - 1 + localizedPosts.length) %
					localizedPosts.length
				const adjustedBIndex =
					(bIndex - relatedToIndex - 1 + localizedPosts.length) %
					localizedPosts.length

				return adjustedAIndex - adjustedBIndex
			})
			.filter((post) => !isSameBlogPost(post, relatedTo))
			.filter((post) => post.tags.some((tag) => relatedTo.tags?.includes(tag)))

	const blogs = relatedTo
		? relatedBlogs?.length
			? relatedBlogs
			: localizedPosts.filter((post) => !isSameBlogPost(post, relatedTo))
		: localizedPosts.filter((post) => !isSameBlogPost(post, relatedTo))

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
		relatedTo?: PartialDeep<Post>
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
									<ArticleCardImage alt="" />
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

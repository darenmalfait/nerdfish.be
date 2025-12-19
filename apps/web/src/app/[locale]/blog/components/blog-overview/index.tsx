import { Skeleton } from '@nerdfish/react/skeleton'
import {
	ArticleCard,
	ArticleCardCategory,
	ArticleCardContent,
	ArticleCardImage,
	ArticleCardTitle,
} from '@repo/design-system/components/article-card'
import { ArticleOverviewContentGrid } from '@repo/design-system/components/article-overview'
import { getLocale } from '@repo/i18n/server'
import { type PartialDeep } from '@repo/lib/types'
import {
	type Blog as BlogJsonLd,
	JsonLd,
	type WithContext,
} from '@repo/seo/json-ld'
import { type Post } from 'content-collections'
import { Suspense } from 'react'
import { blog } from '../../api'
import { filterBlog } from '../../utils'
import {
	BlogOverviewContent,
	type BlogOverviewContentProps,
} from './blog-overview-content'

function isSameItem(item: PartialDeep<Post>, relatedTo?: PartialDeep<Post>) {
	return item.slug === relatedTo?.slug
}

export interface BlogOverviewProps extends Omit<
	BlogOverviewContentProps,
	'items'
> {
	relatedTo?: PartialDeep<Post>
	count?: number
	tags?: string[]
}

export async function BlogOverviewData({
	relatedTo,
	searchEnabled,
	count,
	tags,
	...props
}: BlogOverviewProps) {
	const locale = await getLocale()
	const localizedItems = await blog.getAll({ locale })

	const jsonLd: WithContext<BlogJsonLd> = {
		'@type': 'Blog',
		'@context': 'https://schema.org',
	}

	const relatedItems =
		relatedTo &&
		localizedItems
			.sort((a, b) => {
				// I want to get the index of the previous item, to be the first item in the array
				const relatedToIndex =
					localizedItems.findIndex((post) => post.slug === relatedTo.slug) - 2
				if (relatedToIndex < 0) return 0

				const aIndex = localizedItems.indexOf(a)
				const bIndex = localizedItems.indexOf(b)

				// Adjust indices to start after relatedTo
				const adjustedAIndex =
					(aIndex - relatedToIndex - 1 + localizedItems.length) %
					localizedItems.length
				const adjustedBIndex =
					(bIndex - relatedToIndex - 1 + localizedItems.length) %
					localizedItems.length

				return adjustedAIndex - adjustedBIndex
			})
			.filter((post) => !isSameItem(post, relatedTo))
			.filter((post) => post.tags.some((tag) => relatedTo.tags?.includes(tag)))

	const blogs = relatedTo
		? relatedItems?.length
			? relatedItems
			: localizedItems.filter((post) => !isSameItem(post, relatedTo))
		: localizedItems.filter((post) => !isSameItem(post, relatedTo))

	const items = relatedTo ? blogs : filterBlog(blogs, tags?.join(' ') ?? '')

	const limitedBlogs = count ? items.slice(0, count) : items

	return (
		<>
			{searchEnabled ? <JsonLd code={jsonLd} /> : null}

			<BlogOverviewContent
				{...props}
				searchEnabled={searchEnabled}
				items={limitedBlogs}
			/>
		</>
	)
}

export async function BlogOverview(props: BlogOverviewProps) {
	return (
		<Suspense
			fallback={
				<BlogOverviewContent {...props} items={[]}>
					{props.featuredEnabled ? (
						<Skeleton className="mb-acquaintances rounded-container aspect-video h-full" />
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
				</BlogOverviewContent>
			}
		>
			<BlogOverviewData {...props} />
		</Suspense>
	)
}

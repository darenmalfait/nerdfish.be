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
import { type Wiki, type Post } from 'content-collections'
import * as React from 'react'
import { wiki } from '../api'
import { filterWiki } from '../utils'
import { BlockLayout } from './wiki-overview-layout'
import { type Block, type PageBlocksWiki } from '~/app/cms/types'

function isSame(post: PartialDeep<Post>, relatedTo?: PartialDeep<Post>) {
	return post.slug === relatedTo?.slug
}

export async function WikiOverviewBlockContent(
	data: Block<PageBlocksWiki> & {
		relatedTo?: PartialDeep<Wiki>
	},
) {
	const { header, searchEnabled, tags, count, relatedTo } = data

	const localizedItems = await wiki.getAll()

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
			.filter((post) => !isSame(post, relatedTo))
			.filter((post) => post.tags.some((tag) => relatedTo.tags?.includes(tag)))

	const wikis = relatedTo
		? relatedItems?.length
			? relatedItems
			: localizedItems.filter((post) => !isSame(post, relatedTo))
		: localizedItems.filter((post) => !isSame(post, relatedTo))

	const items = relatedTo ? wikis : filterWiki(wikis, tags?.join(' ') ?? '')

	const limitedItems = count ? items.slice(0, count) : items

	return (
		<BlockLayout
			searchEnabled={searchEnabled ?? false}
			featuredEnabled={false}
			items={limitedItems}
			header={header}
		/>
	)
}

export async function WikiOverviewBlock(
	data: Block<PageBlocksWiki> & {
		relatedTo?: PartialDeep<Wiki>
	},
) {
	const { header, searchEnabled } = data

	return (
		<React.Suspense
			fallback={
				<BlockLayout
					featuredEnabled={false}
					searchEnabled={searchEnabled ?? false}
					items={[]}
					header={header}
				>
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
			<WikiOverviewBlockContent {...data} />
		</React.Suspense>
	)
}

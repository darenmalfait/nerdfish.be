import { Skeleton } from '@nerdfish/react/skeleton'
import {
	ArticleCard,
	ArticleCardCategory,
	ArticleCardContent,
	ArticleCardDescription,
	ArticleCardTitle,
} from '@repo/design-system/components/article-card'
import { ArticleOverviewContentGrid } from '@repo/design-system/components/article-overview'
import { type PartialDeep } from '@repo/lib/types'
import { type Wiki } from 'content-collections'
import { Suspense } from 'react'
import { wiki } from '../../api'
import { filterWiki } from '../../utils'
import {
	WikiOverviewContent,
	type WikiOverviewContentProps,
} from './wiki-overview-content'

function isSameItem(item: PartialDeep<Wiki>, relatedTo?: PartialDeep<Wiki>) {
	return item.slug === relatedTo?.slug
}

export interface WikiOverviewProps extends Omit<
	WikiOverviewContentProps,
	'items'
> {
	relatedTo?: PartialDeep<Wiki>
	count?: number
	tags?: string[]
}

export async function WikiOverviewData({
	relatedTo,
	searchEnabled,
	count,
	tags,
	...props
}: WikiOverviewProps) {
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
			.filter((post) => !isSameItem(post, relatedTo))
			.filter((post) => post.tags.some((tag) => relatedTo.tags?.includes(tag)))

	const wikis = relatedTo
		? relatedItems?.length
			? relatedItems
			: localizedItems.filter((post) => !isSameItem(post, relatedTo))
		: localizedItems.filter((post) => !isSameItem(post, relatedTo))

	const items = relatedTo ? wikis : filterWiki(wikis, tags?.join(' ') ?? '')

	const limitedItems = count ? items.slice(0, count) : items

	return (
		<WikiOverviewContent
			{...props}
			searchEnabled={searchEnabled}
			items={limitedItems}
		/>
	)
}

export async function WikiOverview(props: WikiOverviewProps) {
	return (
		<Suspense
			fallback={
				<WikiOverviewContent {...props} items={[]}>
					<ArticleOverviewContentGrid>
						{Array.from({ length: 2 }).map((_, i) => (
							<li key={i} className="col-span-4">
								<ArticleCard>
									<ArticleCardContent>
										<ArticleCardCategory className="w-16">
											<Skeleton className="bg-transparent" />
										</ArticleCardCategory>
										<ArticleCardTitle>
											<Skeleton count={2} />
										</ArticleCardTitle>
										<ArticleCardDescription>
											<Skeleton count={2} />
										</ArticleCardDescription>
									</ArticleCardContent>
								</ArticleCard>
							</li>
						))}
					</ArticleOverviewContentGrid>
				</WikiOverviewContent>
			}
		>
			<WikiOverviewData {...props} />
		</Suspense>
	)
}

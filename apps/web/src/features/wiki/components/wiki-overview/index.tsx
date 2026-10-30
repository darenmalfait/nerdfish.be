import { Suspense } from 'react'
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

import { NuqsProvider } from '~/providers/nuqs-provider'

import { getWikis } from '../../api/get-wikis'
import { filterWiki } from '../../utils/filter-wiki'
import { toArticleFromWiki } from '../../utils/to-article-from-wiki'

import {
	WikiOverviewContent,
	type WikiOverviewContentProps,
} from './wiki-overview-content'
import { WikiOverviewContentSearchable } from './wiki-overview-content-searchable'

const SKELETON_KEYS = ['skeleton-1', 'skeleton-2']

function isSameItem(item: PartialDeep<Wiki>, relatedTo?: PartialDeep<Wiki>) {
	return item.slug === relatedTo?.slug
}

export interface WikiOverviewProps extends Omit<
	WikiOverviewContentProps,
	'items' | 'customFilterFunction'
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
	const localizedItems = await getWikis()

	const relatedItems =
		relatedTo &&
		localizedItems
			.toSorted((a, b) => {
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
	const overviewItems = limitedItems.map(toArticleFromWiki)

	return searchEnabled ? (
		<WikiOverviewContentSearchable {...props} items={overviewItems} />
	) : (
		<WikiOverviewContent {...props} items={overviewItems} />
	)
}

export async function WikiOverview(props: WikiOverviewProps) {
	return (
		<NuqsProvider enabled={!!props.searchEnabled}>
			<Suspense
				fallback={
					<WikiOverviewContent {...props} items={[]}>
						<ArticleOverviewContentGrid>
							{SKELETON_KEYS.map((key) => (
								<li key={key} className="col-span-4">
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
		</NuqsProvider>
	)
}

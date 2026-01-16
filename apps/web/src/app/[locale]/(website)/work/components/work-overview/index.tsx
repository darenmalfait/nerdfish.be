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
import { type Project } from 'content-collections'
import { Suspense } from 'react'
import { work } from '../../api'
import { filterWork } from '../../utils'
import {
	WorkOverviewContent,
	type WorkOverviewContentProps,
} from './work-overview-content'

function isSameItem(
	item: PartialDeep<Project>,
	relatedTo?: PartialDeep<Project>,
) {
	return item.slug === relatedTo?.slug
}

export interface WorkOverviewProps extends Omit<
	WorkOverviewContentProps,
	'items'
> {
	relatedTo?: PartialDeep<Project>
	count?: number
	tags?: string[]
}

export async function WorkOverviewData({
	relatedTo,
	count,
	tags,
	...props
}: WorkOverviewProps) {
	const locale = await getLocale()
	const localizedItems = await work.getAll({ locale })

	const relatedItems =
		relatedTo &&
		localizedItems
			.sort((a, b) => {
				// I want to get the index of the previous item, to be the first item in the array
				const relatedToIndex =
					localizedItems.findIndex((post) => post.slug === relatedTo.slug) -
					(count ?? 0)

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

	const works = relatedTo
		? relatedItems?.length
			? relatedItems
			: localizedItems.filter((post) => !isSameItem(post, relatedTo))
		: localizedItems.filter((post) => !isSameItem(post, relatedTo))

	const items = relatedTo ? works : filterWork(works, tags?.join(' ') ?? '')

	const limitedItems = count ? items.slice(0, count) : items

	return <WorkOverviewContent {...props} items={limitedItems} />
}

export async function WorkOverview(props: WorkOverviewProps) {
	return (
		<Suspense
			fallback={
				<WorkOverviewContent {...props} items={[]}>
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
				</WorkOverviewContent>
			}
		>
			<WorkOverviewData {...props} />
		</Suspense>
	)
}

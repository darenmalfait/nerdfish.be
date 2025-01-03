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
import { type Project } from 'content-collections'
import * as React from 'react'
import { work } from '../api'
import { filterWork } from '../utils'
import { BlockLayout } from './work-overview-layout'
import { type Block, type PageBlocksWork } from '~/app/cms/types'

function isSameProject(
	post: PartialDeep<Project>,
	relatedTo?: PartialDeep<Project>,
) {
	return post.slug === relatedTo?.slug
}

export async function WorkOverviewBlockContent(
	data: Block<PageBlocksWork> & {
		relatedTo?: PartialDeep<Project>
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
			.filter((post) => !isSameProject(post, relatedTo))
			.filter((post) => post.tags.some((tag) => relatedTo.tags?.includes(tag)))

	const works = relatedTo
		? relatedItems?.length
			? relatedItems
			: localizedItems.filter((post) => !isSameProject(post, relatedTo))
		: localizedItems.filter((post) => !isSameProject(post, relatedTo))

	const items = relatedTo ? works : filterWork(works, tags?.join(' ') ?? '')

	const limitedItems = count ? items.slice(0, count) : items

	return (
		<BlockLayout
			searchEnabled={searchEnabled ?? false}
			featuredEnabled={featuredEnabled ?? false}
			items={limitedItems}
			header={header}
		/>
	)
}

export async function WorkOverviewBlock(
	data: Block<PageBlocksWork> & {
		relatedTo?: PartialDeep<Project>
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
			<WorkOverviewBlockContent {...data} />
		</React.Suspense>
	)
}

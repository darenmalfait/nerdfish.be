import { Skeleton } from '@nerdfish/ui'
import { type PartialDeep } from '@repo/lib/utils/types'
import {
	ArticleCard,
	ArticleCardCategory,
	ArticleCardContent,
	ArticleCardImage,
	ArticleCardTitle,
} from '@repo/ui/components/article-card'
import { ArticleOverviewContentGrid } from '@repo/ui/components/article-overview'
import * as React from 'react'
import { getWorks } from '../api'
import { filterWork } from '../utils'
import { BlockLayout } from './work-overview-layout'
import { type Block, type PageBlocksWork, type Work } from '~/app/cms/types'

function isSameWork(work: PartialDeep<Work>, relatedTo?: PartialDeep<Work>) {
	return work._sys?.relativePath === relatedTo?._sys?.relativePath
}

export async function WorkOverviewBlockContent(
	data: Block<PageBlocksWork> & {
		relatedTo?: PartialDeep<Work>
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
	const localizedWorks = (await getWorks({ locale })) ?? []

	const relatedWorks =
		relatedTo &&
		localizedWorks
			.sort((a, b) => {
				// The array gets sorted so the index of the next item is the first item in the array
				const relatedToIndex = localizedWorks.findIndex(
					(work) => work._sys?.relativePath === relatedTo._sys?.relativePath,
				)
				if (relatedToIndex === -1) return 0

				const aIndex = localizedWorks.indexOf(a)
				const bIndex = localizedWorks.indexOf(b)

				// Adjust indices to start after relatedTo
				const adjustedAIndex =
					(aIndex - relatedToIndex - 1 + localizedWorks.length) %
					localizedWorks.length
				const adjustedBIndex =
					(bIndex - relatedToIndex - 1 + localizedWorks.length) %
					localizedWorks.length

				return adjustedAIndex - adjustedBIndex
			})
			.filter((work) => !isSameWork(work, relatedTo))
			.filter((work) => work.category === relatedTo.category)

	const works = relatedTo
		? relatedWorks?.length
			? relatedWorks
			: localizedWorks.filter((work) => !isSameWork(work, relatedTo))
		: localizedWorks.filter((work) => !isSameWork(work, relatedTo))

	const items = relatedTo ? works : filterWork(works, tags?.join(' ') ?? '')

	const limitedWorks = count ? items.slice(0, count) : items

	return (
		<BlockLayout
			searchEnabled={searchEnabled ?? false}
			featuredEnabled={featuredEnabled ?? false}
			items={limitedWorks}
			header={header}
		/>
	)
}

export async function WorkOverviewBlock(
	data: Block<PageBlocksWork> & {
		relatedTo?: PartialDeep<Work>
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
			<WorkOverviewBlockContent {...data} />
		</React.Suspense>
	)
}

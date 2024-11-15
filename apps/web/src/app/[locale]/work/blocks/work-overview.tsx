'use client'

import {
	Button,
	EmptyStateIcon,
	EmptyState,
	Input,
	EmptyStateTitle,
	EmptyStateDescription,
	EmptyStateActions,
} from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import {
	ArticleCard,
	ArticleCardCategory,
	ArticleCardContent,
	ArticleCardDescription,
	ArticleCardImage,
	ArticleCardTitle,
	Section,
} from '@nerdfish-website/ui/components'
import { NewspaperIcon, PlusIcon, SearchIcon } from '@nerdfish-website/ui/icons'
import Image from 'next/image'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { filterWork, getWorkPath } from '../utils'
import { type Block, type PageBlocksWork } from '~/app/cms'
import {
	SectionHeader,
	HighlightCard,
	SectionHeaderTitle,
	SectionHeaderSubtitle,
	nonNullable,
	HighlightCardImage,
	HighlightCardContent,
	HighlightCardCategory,
	HighlightCardTitle,
	TagFilter,
	HighlightCardCTA,
} from '~/app/common'

// should be divisible by 3 and 2 (large screen, and medium screen).
const PAGE_SIZE = 6

export function WorkOverviewBlock(data: Block<PageBlocksWork>) {
	const {
		header,
		searchEnabled,
		featuredEnabled,
		tags,
		count,
		globalData = {},
	} = data
	const { works: allWork = [] } = globalData
	const { title, subtitle, link } = header ?? {}
	const [query, setQuery] = React.useState('')
	const [indexToShow, setIndexToShow] = React.useState(PAGE_SIZE)

	let filteredWork =
		tags && tags.length > 0 ? filterWork(allWork, tags.join(' ')) : allWork

	const allCategories = [
		...new Set(filteredWork.flatMap((post) => post.category)),
	].filter(nonNullable)

	if (count) {
		filteredWork = filteredWork.slice(0, count)
	}

	const matchingWork = React.useMemo(() => {
		return filterWork(filteredWork, query)
	}, [filteredWork, query])

	const isSearching = query.length > 0
	const featured = filteredWork.length > 0 ? filteredWork[0] : null

	const works =
		isSearching || !featuredEnabled
			? matchingWork.slice(0, indexToShow)
			: matchingWork.filter((p) => p.id !== featured?.id).slice(0, indexToShow)

	const hasMore =
		isSearching || !featuredEnabled
			? indexToShow < matchingWork.length
			: indexToShow < matchingWork.length - 1

	const enabledTags =
		isSearching || !featuredEnabled
			? [...new Set(matchingWork.flatMap((post) => post.category))].filter(
					nonNullable,
				)
			: allCategories

	const selectedTags = allCategories.filter((tag) => query.includes(tag))

	function toggleTag(tag: string) {
		setQuery((q) => {
			// create a regexp so that we can replace multiple occurrences (`react node react`)
			const expression = new RegExp(tag, 'ig')

			const newQuery = expression.test(q)
				? q.replace(expression, '')
				: `${q} ${tag}`

			// trim and remove subsequent spaces (`react   node ` => `react node`)
			return newQuery.replace(/\s+/g, ' ').trim()
		})
	}

	return (
		<Section>
			{searchEnabled ? (
				<div>
					<div
						data-tina-field={tinaField(data, 'header')}
						className="mb-2xl gap-x-md lg:pb-xl relative mx-auto grid h-auto grid-cols-4 justify-center md:grid-cols-8 lg:mb-0 lg:grid-cols-12"
					>
						{header?.image ? (
							<div
								data-tina-field={tinaField(data, 'header')}
								className="mb-lg px-lg col-span-full lg:col-span-5 lg:col-start-7 lg:mb-0"
							>
								<Image
									className="rounded-xl"
									src={header.image}
									width={550}
									height={550}
									loading="eager"
									alt={header.image}
								/>
							</div>
						) : null}
						<div
							className={cx(
								'pt-lg col-span-full lg:row-start-1 lg:flex lg:h-full lg:flex-col',
								{
									'lg:col-span-5 lg:col-start-1': header?.image,
								},
							)}
						>
							<div className="flex flex-auto flex-col justify-center">
								{(title ?? subtitle) ? (
									<SectionHeader>
										{title ? <SectionHeaderTitle animatedText={title} /> : null}
										{subtitle ? (
											<SectionHeaderSubtitle>{subtitle}</SectionHeaderSubtitle>
										) : null}
									</SectionHeader>
								) : null}
								<Input
									type="search"
									value={query}
									onChange={(event) => {
										setQuery(event.currentTarget.value.toLowerCase())
									}}
									className="shadow-outline"
									name="q"
									placeholder="Search"
									icon={SearchIcon}
									inputSize="lg"
								/>
							</div>
						</div>
					</div>
				</div>
			) : null}

			{searchEnabled && allCategories.length > 0 ? (
				<div className="mb-lg">
					<TagFilter
						title="Filter work by topic"
						tags={allCategories}
						enabledTags={enabledTags}
						onToggleTag={toggleTag}
						selectedTags={selectedTags}
					/>
				</div>
			) : null}

			<div className="flex flex-col">
				{!searchEnabled && (title ?? subtitle) ? (
					<div data-tina-field={tinaField(data, 'header')}>
						<SectionHeader
							cta={{
								title: 'See all work',
								url: link ?? '',
							}}
						>
							{title ? <SectionHeaderTitle animatedText={title} /> : null}
							{subtitle ? (
								<SectionHeaderSubtitle>{subtitle}</SectionHeaderSubtitle>
							) : null}
						</SectionHeader>
					</div>
				) : null}

				{!isSearching && featured && featuredEnabled ? (
					<HighlightCard className="mb-xl" title={featured.title ?? ''}>
						<HighlightCardContent>
							<HighlightCardCategory value={featured.category} />
							<HighlightCardTitle>{featured.title}</HighlightCardTitle>
							<HighlightCardCTA
								category={featured.category}
								href={getWorkPath(featured)}
							>
								View project
							</HighlightCardCTA>
						</HighlightCardContent>
						<HighlightCardImage src={featured.heroImg} />
					</HighlightCard>
				) : null}

				{matchingWork.length === 0 ? (
					<EmptyState>
						<EmptyStateIcon>
							<NewspaperIcon />
						</EmptyStateIcon>
						<EmptyStateTitle>No work found</EmptyStateTitle>
						<EmptyStateDescription>
							Try searching for something else.
						</EmptyStateDescription>
						<EmptyStateActions>
							<Button onClick={() => setQuery('')}>Clear search</Button>
						</EmptyStateActions>
					</EmptyState>
				) : (
					<ul className="gap-x-lg gap-y-xl grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
						{works.map((work) => {
							return (
								<li key={work.id} className="col-span-4">
									<ArticleCard
										href={getWorkPath(work)}
										title={work.title ?? ''}
									>
										<ArticleCardImage
											src={work.heroImg}
											category={work.category}
										/>
										<ArticleCardContent>
											<ArticleCardCategory>{work.category}</ArticleCardCategory>
											<ArticleCardTitle>{work.title}</ArticleCardTitle>
											<ArticleCardDescription>
												{work.excerpt}
											</ArticleCardDescription>
										</ArticleCardContent>
									</ArticleCard>
								</li>
							)
						})}
					</ul>
				)}

				{hasMore ? (
					<div className="mt-2xl flex w-full justify-center">
						<Button
							size="lg"
							disabled={!hasMore}
							variant="outline"
							onClick={() => setIndexToShow((i) => i + PAGE_SIZE)}
						>
							<span className="mr-sm">Load more</span>{' '}
							<PlusIcon className="size-4" />
						</Button>
					</div>
				) : null}
			</div>
		</Section>
	)
}

/*
eslint
  complexity: "off",
*/

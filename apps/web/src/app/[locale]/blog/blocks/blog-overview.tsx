'use client'

import {
	Button,
	EmptyState,
	EmptyStateActions,
	EmptyStateDescription,
	EmptyStateIcon,
	EmptyStateTitle,
	Input,
} from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { Section } from '@nerdfish-website/ui/components'
import { NewspaperIcon, PlusIcon, SearchIcon } from '@nerdfish-website/ui/icons'
import { formatDate } from 'date-fns/format'
import { parseISO } from 'date-fns/parseISO'
import Image from 'next/image'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { filterBlog, getBlogPath } from '../utils'
import { type Block, type PageBlocksBlog } from '~/app/cms'
import {
	ArticleCard,
	SectionHeader,
	HighlightCard,
	nonNullable,
	SectionHeaderTitle,
	SectionHeaderSubtitle,
} from '~/app/common'
import { TagFilter } from '~/app/common/components/tag-filter'

// should be divisible by 3 and 2 (large screen, and medium screen).
const PAGE_SIZE = 6

export function BlogOverviewBlock(data: Block<PageBlocksBlog>) {
	const {
		header,
		searchEnabled,
		featuredEnabled,
		tags,
		count,
		globalData = {},
	} = data
	const { blogs: allPosts = [] } = globalData
	const { title, subtitle, link } = header ?? {}
	const [query, setQuery] = React.useState('')
	const [indexToShow, setIndexToShow] = React.useState(PAGE_SIZE)

	let filteredPosts =
		tags && tags.length > 0 ? filterBlog(allPosts, tags.join(' ')) : allPosts

	const allTags = [
		...new Set(filteredPosts.flatMap((post) => post.tags)),
	].filter(nonNullable)

	if (count) {
		filteredPosts = filteredPosts.slice(0, count)
	}

	const matchingPosts = React.useMemo(() => {
		return filterBlog(filteredPosts, query)
	}, [filteredPosts, query])

	const isSearching = query.length > 0
	const featured = filteredPosts.length > 0 ? filteredPosts[0] : null

	const posts =
		isSearching || !featuredEnabled
			? matchingPosts.slice(0, indexToShow)
			: matchingPosts.filter((p) => p.id !== featured?.id).slice(0, indexToShow)

	const hasMorePosts =
		isSearching || !featuredEnabled
			? indexToShow < matchingPosts.length
			: indexToShow < matchingPosts.length - 1

	const enabledTags =
		isSearching || !featuredEnabled
			? [...new Set(matchingPosts.flatMap((post) => post.tags))].filter(
					nonNullable,
				)
			: allTags

	const selectedTags = allTags.filter((tag) => query.includes(tag))

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
						className="relative mx-auto mb-24 grid h-auto grid-cols-4 justify-center gap-x-4 md:grid-cols-8 lg:mb-0 lg:grid-cols-12 lg:gap-x-6 lg:pb-12"
					>
						{header?.image ? (
							<div
								data-tina-field={tinaField(data, 'header')}
								className="col-span-full mb-12 px-10 lg:col-span-5 lg:col-start-7 lg:mb-0"
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
								'col-span-full pt-6 lg:row-start-1 lg:flex lg:h-full lg:flex-col',
								{
									'lg:col-span-5 lg:col-start-1': header?.image,
								},
							)}
						>
							<div className="flex flex-auto flex-col justify-center space-y-4">
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

			{searchEnabled && allTags.length > 0 ? (
				<TagFilter
					title="Filter articles by topic"
					tags={allTags}
					enabledTags={enabledTags}
					onToggleTag={toggleTag}
					selectedTags={selectedTags}
				/>
			) : null}

			<div className="flex flex-col">
				{!searchEnabled && (title ?? subtitle) ? (
					<div data-tina-field={tinaField(data, 'header')}>
						<SectionHeader
							cta={{
								title: 'See all articles',
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
					<HighlightCard
						className="mb-12"
						category={featured.category}
						href={getBlogPath(featured)}
						title={featured.title}
						subtitle={
							featured.date
								? `${formatDate(parseISO(featured.date), 'PPP')}`
								: 'TBA'
						}
						image={featured.heroImg}
					/>
				) : null}

				{matchingPosts.length === 0 ? (
					<EmptyState>
						<EmptyStateIcon>
							<NewspaperIcon />
						</EmptyStateIcon>
						<EmptyStateTitle>No articles found</EmptyStateTitle>
						<EmptyStateDescription>
							Try searching for something else.
						</EmptyStateDescription>
						<EmptyStateActions>
							<Button onClick={() => setQuery('')}>Clear search</Button>
						</EmptyStateActions>
					</EmptyState>
				) : (
					<ul className="grid grid-cols-4 gap-x-4 gap-y-16 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6">
						{posts.map((blog) => {
							return (
								<li key={blog.id} className="col-span-4">
									<ArticleCard href={getBlogPath(blog)} {...blog} />
								</li>
							)
						})}
					</ul>
				)}

				{hasMorePosts ? (
					<div className="mb-16 flex w-full justify-center">
						<Button
							disabled={!hasMorePosts}
							variant="secondary"
							className="space-x-2"
							onClick={() => setIndexToShow((i) => i + PAGE_SIZE)}
						>
							<span>Load more</span> <PlusIcon width="20px" height="20px" />
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

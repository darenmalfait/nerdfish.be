/* eslint-disable complexity */
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
import { DateFormatter } from '@nerdfish-website/ui/components/date-formatter.tsx'
import { Icons } from '@nerdfish-website/ui/icons'
import { Plus, Search } from 'lucide-react'
import Image from 'next/image'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'

import { filterWiki } from '../utils'
import { PortableText, type Block, type PageBlocksWiki } from '~/app/cms'
import { getDatedSlug, Header, nonNullable } from '~/app/common'
import { TagFilter } from '~/app/common/components/tag-filter'

// should be divisible by 3 and 2 (large screen, and medium screen).
const PAGE_SIZE = 6

export function WikiOverviewBlock(data: Block<PageBlocksWiki>) {
	const { header, searchEnabled, tags, count, globalData } = data
	const { wikis: allPosts = [] } = globalData ?? {}
	const { title, subtitle, link } = header ?? {}
	const [query, setQuery] = React.useState('')
	const [indexToShow, setIndexToShow] = React.useState(PAGE_SIZE)

	let filteredPosts =
		tags && tags.length > 0 ? filterWiki(allPosts, tags.join(' ')) : allPosts

	const allTags = [
		...new Set(filteredPosts.flatMap((post) => post.tags)),
	].filter(nonNullable)

	if (count) {
		filteredPosts = filteredPosts.slice(0, count)
	}

	const matchingPosts = React.useMemo(() => {
		return filterWiki(filteredPosts, query)
	}, [filteredPosts, query])

	const posts = matchingPosts.slice(0, indexToShow)
	const hasMorePosts = indexToShow < matchingPosts.length

	const enabledTags = [
		...new Set(matchingPosts.flatMap((post) => post.tags)),
	].filter(nonNullable)
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
		<>
			{searchEnabled ? (
				<section className="container mx-auto px-4">
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
									<Header title={title ?? ''} subtitle={subtitle} />
								) : null}
								<Input
									type="search"
									value={query}
									onChange={(event) => {
										setQuery(event.currentTarget.value.toLowerCase())
									}}
									name="q"
									placeholder="Search"
									icon={Search}
									inputSize="lg"
								/>
							</div>
						</div>
					</div>
				</section>
			) : null}

			{searchEnabled && allTags.length > 0 ? (
				<TagFilter
					title="Filter knowledge base by topic"
					tags={allTags}
					enabledTags={enabledTags}
					onToggleTag={toggleTag}
					selectedTags={selectedTags}
				/>
			) : null}

			<section className="container mx-auto space-y-14 px-4 py-12 sm:space-y-16 sm:py-16 lg:max-w-3xl">
				{!searchEnabled && (title ?? subtitle) ? (
					<div data-tina-field={tinaField(data, 'header')}>
						<Header
							title={title ?? ''}
							subtitle={subtitle}
							cta="see all"
							className="mb-12"
							ctaUrl={link ?? ''}
						/>
					</div>
				) : null}

				{matchingPosts.length === 0 ? (
					<EmptyState>
						<EmptyStateIcon>
							<Icons.Book />
						</EmptyStateIcon>
						<EmptyStateTitle>No wiki pages found</EmptyStateTitle>
						<EmptyStateDescription>
							Try searching for something else.
						</EmptyStateDescription>
						<EmptyStateActions>
							<Button onClick={() => setQuery('')}>Clear search</Button>
						</EmptyStateActions>
					</EmptyState>
				) : (
					posts.map((wiki) => {
						return (
							<article key={wiki._sys?.filename} className="flex flex-col">
								<a
									href={`/wiki${getDatedSlug(
										wiki.date as string,
										wiki._sys?.filename ?? '',
									)}`}
									className="text-primary hover:text-muted line-clamp-3 text-2xl font-semibold leading-snug hover:underline"
								>
									{wiki.title}
								</a>
								{wiki.date ? (
									<p className="text-muted mt-2 text-sm font-bold">
										<DateFormatter dateString={wiki.date} format="PPP" />
									</p>
								) : null}
								<div className="text-muted mt-2 text-justify">
									<PortableText content={wiki.excerpt} />
								</div>
							</article>
						)
					})
				)}

				{hasMorePosts ? (
					<div className="mb-16 flex w-full justify-center">
						<Button
							disabled={!hasMorePosts}
							variant="secondary"
							className="space-x-2"
							onClick={() => setIndexToShow((i) => i + PAGE_SIZE)}
						>
							<span>Load more</span> <Plus width="20px" height="20px" />
						</Button>
					</div>
				) : null}
			</section>
		</>
	)
}

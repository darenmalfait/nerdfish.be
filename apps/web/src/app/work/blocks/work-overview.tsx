'use client'

import { Button, H3, H5 } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { Tag } from '@nerdfish-website/ui/components/tag.tsx'
import { Plus, Search } from 'lucide-react'
import Image from 'next/image'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'

import { filterWork } from '../utils'
import { type Block, type PageBlocksWork } from '~/app/cms'
import { ArticleCard, Header, HighlightCard, WorkPath } from '~/app/common'

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
	const { works: allWorks = [] } = globalData

	const { title, subtitle, link } = header ?? {}
	const [query, setQuery] = React.useState('')
	const [indexToShow, setIndexToShow] = React.useState(PAGE_SIZE)

	let filteredPosts =
		tags && tags.length > 0 ? filterWork(allWorks, tags.join(' ')) : allWorks
	const allTags = [...new Set(filteredPosts.flatMap((post) => post.category))]

	if (count) {
		filteredPosts = filteredPosts.slice(0, count)
	}

	const matchingPosts = React.useMemo(() => {
		return filterWork(filteredPosts, query)
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

	const visibleTags =
		isSearching || !featuredEnabled
			? [...new Set(matchingPosts.flatMap((post) => post.category))]
			: allTags

	function toggleTag(tag: string) {
		setQuery((q) => {
			const newQuery = q.includes(tag)
				? q.replace(new RegExp(tag, 'ig'), '')
				: `${q} ${tag}`
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
							<div className="flex flex-auto flex-col justify-center">
								{title ?? subtitle ? (
									<Header title={title ?? undefined} subtitle={subtitle} />
								) : null}
								<div className="relative w-full pb-8 pt-6 text-center lg:py-8 lg:text-left">
									<Search
										width="20px"
										height="20px"
										className="text-muted absolute left-6 top-0 flex h-full items-center justify-center border-none bg-transparent p-0"
									/>
									<input
										type="search"
										value={query}
										onChange={(event) => {
											setQuery(event.currentTarget.value.toLowerCase())
										}}
										name="q"
										placeholder="Search"
										className="bg-primary text-primary/60 focus-ring w-full rounded-full border-2 py-6 pl-14 pr-16 outline-none"
									/>
									<div className="text-muted absolute right-0 top-0 hidden h-full w-14 items-center justify-between text-lg font-bold md:flex">
										{matchingPosts.length}
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			) : null}

			{searchEnabled && allTags.length > 0 ? (
				<div className="container mx-auto my-16 px-4">
					<H5 as="h3" className="mb-8">
						Filter articles by topic
					</H5>
					<div className="col-span-full -mb-4 -mr-4 flex flex-wrap justify-start lg:col-span-10">
						{allTags.map((tag) => {
							if (!tag) {
								return null
							}

							const selected = query.includes(tag)
							return (
								<Tag
									key={tag}
									tag={tag}
									selected={selected}
									onClick={() => toggleTag(tag)}
									disabled={visibleTags.includes(tag) ? false : !selected}
								/>
							)
						})}
					</div>
				</div>
			) : null}

			<section className="container mx-auto flex flex-col gap-12 px-4">
				{!searchEnabled && (title ?? subtitle) ? (
					<div data-tina-field={tinaField(data, 'header')}>
						<Header
							title={title ?? undefined}
							subtitle={subtitle}
							cta="See all articles"
							ctaUrl={link ?? ''}
						/>
					</div>
				) : null}

				{!isSearching && featured && featuredEnabled ? (
					<HighlightCard
						category={featured.category}
						href={`/${WorkPath}/${featured.category}/${featured._sys?.filename}`}
						title={featured.title}
						image={featured.heroImg}
					/>
				) : null}

				{matchingPosts.length === 0 ? (
					<div className="flex grid-cols-4 flex-col">
						<H3 as="p" variant="secondary" className="max-w-lg">
							No articles found for your search query.
						</H3>
					</div>
				) : (
					<div className="grid grid-cols-4 gap-x-4 gap-y-16 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6">
						{posts.map((work) => {
							return (
								<div key={work.id} className="col-span-4">
									<ArticleCard
										href={`/${WorkPath}/${work.category}/${work._sys?.filename}`}
										{...work}
									/>
								</div>
							)
						})}
					</div>
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

/*
eslint
  complexity: "off",
*/

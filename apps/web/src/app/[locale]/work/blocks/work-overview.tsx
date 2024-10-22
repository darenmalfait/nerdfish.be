'use client'

import { Button, H3, H5 } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import {
	ArticleCard,
	ArticleCardContent,
	ArticleCardDescription,
	ArticleCardImage,
	ArticleCardTitle,
	Section,
	Tag,
} from '@nerdfish-website/ui/components'
import { PlusIcon, SearchIcon } from '@nerdfish-website/ui/icons'
import Image from 'next/image'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { filterWork, getWorkPath } from '../utils'
import { type Block, type PageBlocksWork } from '~/app/cms'
import {
	SectionHeader,
	HighlightCard,
	WorkPath,
	SectionHeaderTitle,
	SectionHeaderSubtitle,
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
							<div className="flex flex-auto flex-col justify-center">
								{(title ?? subtitle) ? (
									<SectionHeader>
										{title ? <SectionHeaderTitle animatedText={title} /> : null}
										{subtitle ? (
											<SectionHeaderSubtitle>{subtitle}</SectionHeaderSubtitle>
										) : null}
									</SectionHeader>
								) : null}
								<div className="relative w-full pb-8 pt-6 text-center lg:py-8 lg:text-left">
									<SearchIcon
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
				</div>
			) : null}

			{searchEnabled && allTags.length > 0 ? (
				<div className="my-16">
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

			<div className="flex flex-col">
				{!searchEnabled && (title ?? subtitle) ? (
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
				) : null}

				{!isSearching && featured && featuredEnabled ? (
					<HighlightCard
						className="mb-12"
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
					<ul className="grid grid-cols-4 gap-x-4 gap-y-16 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6">
						{posts.map((work) => {
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
											<ArticleCardTitle>{work.title}</ArticleCardTitle>
											<ArticleCardDescription>
												{work.seo?.description}
											</ArticleCardDescription>
										</ArticleCardContent>
									</ArticleCard>
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

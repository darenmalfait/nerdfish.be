/* eslint-disable complexity */
'use client'

import { Button, H3, H5 } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { DateFormatter } from '@nerdfish-website/ui/components/date-formatter.tsx'
import { Tag } from '@nerdfish-website/ui/components/tag.tsx'
import { Plus, Search } from 'lucide-react'
import Image from 'next/image'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'

import { filterWiki } from '../utils'
import { PortableText, type Block, type PageBlocksWiki } from '~/app/cms'
import { getDatedSlug, Header } from '~/app/common'

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

	const allTags = [...new Set(filteredPosts.flatMap((post) => post.tags))]

	if (count) {
		filteredPosts = filteredPosts.slice(0, count)
	}

	const matchingPosts = React.useMemo(() => {
		return filterWiki(filteredPosts, query)
	}, [filteredPosts, query])

	const posts = matchingPosts.slice(0, indexToShow)
	const hasMorePosts = indexToShow < matchingPosts.length
	const visibleTags = [...new Set(matchingPosts.flatMap((post) => post.tags))]

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
							<div className="flex flex-auto flex-col justify-center">
								{title ?? subtitle ? (
									<Header title={title ?? ''} subtitle={subtitle} />
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
				<div className="container mx-auto my-16 flex flex-col px-4">
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
									onClick={() => toggleTag(tag || '')}
									disabled={visibleTags.includes(tag) ? false : !selected}
								/>
							)
						})}
					</div>
				</div>
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
					<div>
						<H3 as="p" variant="secondary" className="max-w-lg">
							No results found.
						</H3>
					</div>
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

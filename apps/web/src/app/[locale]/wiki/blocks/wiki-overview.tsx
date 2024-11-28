'use client'

import {
	Button,
	EmptyState,
	EmptyStateActions,
	EmptyStateDescription,
	EmptyStateIcon,
	EmptyStateTitle,
	Input,
	Separator,
} from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { nonNullable } from '@repo/lib/utils/array'
import {
	ArticleCard,
	ArticleCardContent,
	ArticleCardDescription,
	ArticleCardTitle,
} from '@repo/ui/components/article-card'
import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/ui/components/section'
import { TagFilter } from '@repo/ui/components/tag-filter'
import { BookIcon, PlusIcon, SearchIcon } from '@repo/ui/icons'
import Image from 'next/image'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { PortableText } from '~/app/cms/components/portable-text'
import type { Block, PageBlocksWiki } from '~/app/cms/types'
import { useTranslation } from '~/app/i18n/translation-provider'
import { filterWiki, getWikiPath } from '../utils'

// should be divisible by 3 and 2 (large screen, and medium screen).
const PAGE_SIZE = 6

export function WikiOverviewBlock(data: Block<PageBlocksWiki>) {
	const { t } = useTranslation()
	const { header, searchEnabled, tags, count, globalData } = data
	const { wikis: allPosts = [] } = globalData ?? {}
	const { title, subtitle, link } = header ?? {}
	const [query, setQuery] = React.useState('')
	const [indexToShow, setIndexToShow] = React.useState(PAGE_SIZE)

	let filteredPosts =
		tags && tags.length > 0 ? filterWiki(allPosts, tags.join(' ')) : allPosts

	const allTags = nonNullable([
		...new Set(filteredPosts.flatMap((post) => post.tags)),
	])

	if (count) {
		filteredPosts = filteredPosts.slice(0, count)
	}

	const matchingPosts = React.useMemo(() => {
		return filterWiki(filteredPosts, query)
	}, [filteredPosts, query])

	const posts = matchingPosts.slice(0, indexToShow)
	const hasMorePosts = indexToShow < matchingPosts.length

	const enabledTags = nonNullable([
		...new Set(matchingPosts.flatMap((post) => post.tags)),
	])
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
						className="relative mx-auto mb-2xl grid h-auto grid-cols-4 justify-center gap-x-md md:grid-cols-8 lg:mb-0 lg:grid-cols-12 lg:pb-xl"
					>
						{header?.image ? (
							<div
								data-tina-field={tinaField(data, 'header')}
								className="col-span-full mb-lg px-lg lg:col-span-5 lg:col-start-7 lg:mb-0"
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
								'col-span-full lg:row-start-1 lg:flex lg:h-full lg:flex-col',
								{
									'lg:col-span-5 lg:col-start-1': header?.image,
								}
							)}
						>
							<div className="flex flex-auto flex-col justify-center">
								<SectionHeader>
									<SectionHeaderTitle>{title}</SectionHeaderTitle>
									<SectionHeaderSubtitle>{subtitle}</SectionHeaderSubtitle>
								</SectionHeader>

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
				<div className="mb-lg">
					<TagFilter
						title="Filter knowledge base by topic"
						tags={allTags}
						enabledTags={enabledTags}
						onToggleTag={toggleTag}
						selectedTags={selectedTags}
					/>
				</div>
			) : null}

			<div className="mx-auto flex flex-col lg:max-w-3xl">
				{!searchEnabled && (title ?? subtitle) ? (
					<div data-tina-field={tinaField(data, 'header')}>
						<SectionHeader
							cta={{
								title: t('global.allArticles'),
								url: link ?? '',
							}}
						>
							<SectionHeaderTitle>{title}</SectionHeaderTitle>
							<SectionHeaderSubtitle>{subtitle}</SectionHeaderSubtitle>
						</SectionHeader>
					</div>
				) : null}

				{matchingPosts.length === 0 ? (
					<EmptyState>
						<EmptyStateIcon>
							<BookIcon />
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
					<ul>
						{posts.map((wiki, i) => {
							return (
								<li key={wiki._sys?.filename} className="mx-auto flex flex-col">
									<ArticleCard
										href={getWikiPath(wiki)}
										title={wiki.title ?? ''}
									>
										<ArticleCardContent className="my-0">
											<ArticleCardTitle className="group-hover:underline">
												{wiki.title}
											</ArticleCardTitle>
											<ArticleCardDescription>
												<PortableText content={wiki.excerpt} />
											</ArticleCardDescription>
										</ArticleCardContent>
									</ArticleCard>
									{i < posts.length - 1 ? <Separator className="my-8" /> : null}
								</li>
							)
						})}
					</ul>
				)}

				{hasMorePosts ? (
					<div className="mt-2xl flex w-full justify-center">
						<Button
							size="lg"
							disabled={!hasMorePosts}
							variant="outline"
							onClick={() => setIndexToShow((i) => i + PAGE_SIZE)}
						>
							<span className="mr-sm">{t('global.loadMore')}</span>
							<PlusIcon className="size-4" />
						</Button>
					</div>
				) : null}
			</div>
		</Section>
	)
}

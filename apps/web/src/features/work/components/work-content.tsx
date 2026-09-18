import { Button } from '@nerdfish/react/button'
import { Skeleton } from '@nerdfish/react/skeleton'
import {
	CategoryIndicator,
	getCategoryForeground,
} from '@repo/design-system/components/category-indicator'
import { Section } from '@repo/design-system/components/section'
import { cn } from '@repo/lib/utils/class'
import { type Project } from 'content-collections'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type * as React from 'react'
import { getWorkLayout, type WorkLayout } from '../utils'
import { Body } from './work-body'

type WorkContentProps = {
	data: Project
	relatedContent?: React.ReactNode
}

function WorkHeader({ data }: { data: Project }) {
	const { title, category, url, excerpt } = data

	return (
		<>
			<CategoryIndicator className="mb-friends" category={category} inline />

			<header className={cn('mb-casual mx-auto flex max-w-4xl flex-col')}>
				<h4 className="typography-title m-0! w-auto text-4xl!">{title}</h4>
				<div className="mt-friends gap-friends mb-friends relative flex items-center">
					{url ? (
						<div>
							<Button
								variant="secondary"
								render={
									<Link
										className="group no-underline"
										href={url}
										target="_blank"
									>
										Visit website
										<span className={getCategoryForeground(category)}>
											<ArrowRight
												className={cn(
													'ml-best-friends group-hover:translate-x-bff group-hover:text-foreground size-4 text-current transition-all',
												)}
											/>
										</span>
									</Link>
								}
							/>
						</div>
					) : null}
				</div>
			</header>

			{excerpt ? (
				<p className="typography-body text-foreground mb-friends! m-0! text-xl font-bold">
					{excerpt}
				</p>
			) : null}
		</>
	)
}

function WorkSummary({ summary }: { summary?: string | null }) {
	if (!summary) return null

	return (
		<div className="typography mx-auto max-w-4xl">
			<Body content={summary} />
		</div>
	)
}

function WorkHero({ heroImg }: { heroImg: Project['heroImg'] }) {
	if (!heroImg.src) return null

	return (
		<div className="my-xl mx-auto">
			<div className="rounded-container relative mx-auto aspect-4/3 max-w-7xl overflow-hidden">
				<Skeleton className="rounded-container absolute inset-0 size-full object-cover" />
				{/* TODO: add aria description */}
				<Image
					aria-hidden
					src={heroImg.src}
					alt={heroImg.alt}
					className="motion-blur-in-3xl motion-duration-500 rounded-container absolute inset-0 size-full object-cover"
					width={900}
					height={900}
				/>
			</div>
		</div>
	)
}

function SidebarWorkContent({ data, relatedContent }: WorkContentProps) {
	const { body, summary } = data

	return (
		<div className="relative">
			<Section
				className="md:-mt-strangers gap-acquaintances mx-auto flex flex-col pt-0 xl:flex-row"
				asChild
			>
				<article>
					<Section compact className="px-0 xl:max-w-125">
						<div className="py-casual xl:top-acquaintances max-w-4xl xl:sticky">
							<WorkHeader data={data} />
							<WorkSummary summary={summary} />
						</div>
					</Section>

					{body.length ? (
						<div className="flex flex-1 flex-col">
							<div className="-mx-friends">
								<Body content={body} />
							</div>
						</div>
					) : null}
				</article>
			</Section>

			{relatedContent}
		</div>
	)
}

function FullWorkContent({ data, relatedContent }: WorkContentProps) {
	const { summary, heroImg } = data

	return (
		<div className="relative">
			<Section
				className="md:-mt-strangers gap-acquaintances mx-auto flex flex-col pt-0 xl:flex-row"
				asChild
			>
				<article>
					<Section compact className="container max-w-4xl px-0">
						<div className="py-casual xl:top-acquaintances max-w-4xl xl:sticky">
							<WorkHeader data={data} />
							<WorkHero heroImg={heroImg} />
							<WorkSummary summary={summary} />
						</div>
					</Section>
				</article>
			</Section>

			{relatedContent}
		</div>
	)
}

const workContentByLayout: Record<
	WorkLayout,
	(props: WorkContentProps) => React.ReactNode
> = {
	sidebar: SidebarWorkContent,
	full: FullWorkContent,
}

function WorkContent({ data, relatedContent }: WorkContentProps) {
	const Content = workContentByLayout[getWorkLayout(data.category)]
	return <Content data={data} relatedContent={relatedContent} />
}

export { WorkContent }

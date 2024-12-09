import { H1, Skeleton } from '@nerdfish/ui'
import { env } from '@repo/env'
import { type BlogPosting, JsonLd, type WithContext } from '@repo/seo/json-ld'
import { author } from '@repo/seo/metadata'
import { DateFormatter } from '@repo/ui/components/date-formatter'
import { ReadingProgress } from '@repo/ui/components/reading-progress'
import { Section } from '@repo/ui/components/section'
import Image from 'next/image'
import type * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { getBlogPath } from '../utils'
import { BackToBlog } from './misc'
import { PortableText } from '~/app/cms/components/portable-text'
import { type BlogPostQueryQuery } from '~/app/cms/types'
import { type Locale } from '~/app/i18n/types'

function BlogContent({
	data,
	relatedContent,
	locale,
}: {
	data: BlogPostQueryQuery
	relatedContent?: React.ReactNode
	locale: Locale
}) {
	const { title, date, excerpt, heroImg, body } = data.blog

	const jsonLd: WithContext<BlogPosting> = {
		'@type': 'BlogPosting',
		'@context': 'https://schema.org',
		datePublished: new Date(date).toISOString(),
		description: excerpt ?? '',
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': new URL(getBlogPath(data.blog), env.NEXT_PUBLIC_URL).toString(),
		},
		headline: title,
		image: heroImg
			? {
					'@type': 'ImageObject',
					url: heroImg.src
						? new URL(heroImg.src, env.NEXT_PUBLIC_URL).toString()
						: undefined,
				}
			: undefined,
		dateModified: new Date(date).toISOString(),
		inLanguage: locale,
		author: {
			'@type': 'Person',
			name: author.name,
		},
		isAccessibleForFree: true,
	}

	return (
		<>
			<JsonLd code={jsonLd} />
			<article>
				<ReadingProgress title={title} offset={2500} />
				<Section>
					<div className="mb-lg">
						<BackToBlog />
					</div>
					<header className="flex flex-col">
						{date ? (
							<span
								className="mb-xs text-muted text-lg"
								data-tina-field={tinaField(data.blog, 'date')}
							>
								<DateFormatter dateString={date} format="dd MMMM yyyy" />
							</span>
						) : null}
						<H1
							variant="primary"
							data-tina-field={tinaField(data.blog, 'title')}
							className="!mb-xl w-auto"
						>
							{title}
						</H1>
					</header>
					{heroImg?.src ? (
						<div className="mb-xl mx-auto">
							<div
								className="rounded-container relative mx-auto aspect-[4/3] max-w-7xl overflow-hidden"
								data-tina-field={tinaField(data.blog, 'heroImg')}
							>
								<Skeleton className="rounded-container absolute inset-0 size-full object-cover" />
								{/* TODO: add aria description */}
								<Image
									aria-hidden
									src={heroImg.src}
									alt={heroImg.alt ?? title}
									className="motion-blur-in-3xl motion-duration-500 rounded-container absolute inset-0 size-full object-cover"
									width={900}
									height={900}
								/>
							</div>
						</div>
					) : null}

					{body ? (
						<div className="prose dark:prose-invert prose-lg md:prose-xl lg:prose-2xl mx-auto">
							<PortableText
								data-tina-field={tinaField(data.blog, 'body')}
								content={body}
							/>
						</div>
					) : null}
				</Section>
				{relatedContent}
			</article>
		</>
	)
}

export { BlogContent }

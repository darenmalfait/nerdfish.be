import { DateFormatter } from '@repo/calendar/components/date-formatter'
import { ReadingProgress } from '@repo/design-system/components/reading-progress'
import { Section } from '@repo/design-system/components/section'
import { TextBalancer } from '@repo/design-system/components/text-balancer'
import { Badge, H2, Skeleton } from '@repo/design-system/components/ui'
import { type Locale } from '@repo/i18n/types'
import { cx } from '@repo/lib/utils/base'
import { type BlogPosting, JsonLd, type WithContext } from '@repo/seo/json-ld'
import { author } from '@repo/seo/metadata'
import { type Post } from 'content-collections'
import { env } from 'env'
import Image from 'next/image'
import type * as React from 'react'
import { getBlogPath } from '../utils'
import { BackToBlog } from './misc'
import { Body } from '~/app/components/body'

const prose = 'prose md:prose-lg lg:prose-xl max-w-4xl mx-auto'

function BlogContent({
	data,
	relatedContent,
	locale,
}: {
	data: Post
	relatedContent?: React.ReactNode
	locale: Locale
}) {
	const { title, date, excerpt, heroImg, body, imageBlur } = data

	const jsonLd: WithContext<BlogPosting> = {
		'@type': 'BlogPosting',
		'@context': 'https://schema.org',
		datePublished: new Date(date).toISOString(),
		description: excerpt,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': new URL(getBlogPath(data), env.NEXT_PUBLIC_URL).toString(),
		},
		headline: title,
		image: {
			'@type': 'ImageObject',
			url: heroImg.src
				? new URL(heroImg.src, env.NEXT_PUBLIC_URL).toString()
				: undefined,
		},
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
					<div className={cx('mb-lg', prose)}>
						<BackToBlog />
					</div>
					<header className={cx('mb-xl mx-auto flex flex-col', prose)}>
						{date ? (
							<div className="mb-sm">
								<Badge variant="secondary">
									<DateFormatter dateString={date} format="dd MMMM yyyy" />
								</Badge>
							</div>
						) : null}
						<H2 as="h1" className="!mt-0 w-auto" variant="primary">
							<TextBalancer>{title}</TextBalancer>
						</H2>
					</header>

					{heroImg.src ? (
						<div className="mb-xl mx-auto">
							<div className="rounded-container relative mx-auto aspect-[4/3] max-w-7xl overflow-hidden">
								<Skeleton className="rounded-container absolute inset-0 size-full object-cover" />
								{/* TODO: add aria description */}
								<Image
									aria-hidden
									src={heroImg.src}
									alt={heroImg.alt}
									placeholder={imageBlur ? 'blur' : undefined}
									blurDataURL={imageBlur}
									className="rounded-container absolute inset-0 size-full object-cover"
									width={900}
									height={900}
								/>
							</div>
						</div>
					) : null}

					{body ? (
						<div className={prose}>
							<Body content={body} />
						</div>
					) : null}
				</Section>
				{relatedContent}
			</article>
		</>
	)
}

export { BlogContent }

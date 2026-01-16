import { Badge } from '@nerdfish/react/badge'
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from '@nerdfish/react/breadcrumb'
import { Skeleton } from '@nerdfish/react/skeleton'
import { DateFormatter } from '@repo/calendar/components/date-formatter'
import { Section } from '@repo/design-system/components/section'
import { type Locale } from '@repo/i18n/types'
import { cn } from '@repo/lib/utils/class'
import { type BlogPosting, JsonLd, type WithContext } from '@repo/seo/json-ld'
import { author } from '@repo/seo/metadata'
import { type Post } from 'content-collections'
import { env } from 'env'
import Image from 'next/image'
import Link from 'next/link'
import type * as React from 'react'
import { Body } from '../../components/body'
import { getBlogPath } from '../utils'

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
				<Section>
					<div className={cn('mb-casual', 'mx-auto max-w-4xl')}>
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem>
									<BreadcrumbLink render={<Link href="/">Nerdfish</Link>} />
								</BreadcrumbItem>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbLink render={<Link href="/blog">Blog</Link>} />
								</BreadcrumbItem>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbPage>{title}</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
					<header
						className={cn(
							'mb-acquaintances mx-auto flex flex-col',
							'typography mx-auto max-w-4xl',
						)}
					>
						{date ? (
							<div className="mb-best-friends">
								<Badge variant="muted">
									<DateFormatter dateString={date} format="dd MMMM yyyy" />
								</Badge>
							</div>
						) : null}
						<h1 className="typography-heading mt-0! w-auto">{title}</h1>
					</header>

					{heroImg.src ? (
						<div className="mb-acquaintances mx-auto">
							<div className="rounded-container relative mx-auto aspect-4/3 max-w-7xl overflow-hidden shadow-md">
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
						<div className="typography mx-auto max-w-4xl">
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

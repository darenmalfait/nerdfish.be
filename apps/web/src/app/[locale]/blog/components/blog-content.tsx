import { H1 } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { env } from '@repo/env'
import { type BlogPosting, JsonLd, type WithContext } from '@repo/seo/json-ld'
import { author } from '@repo/seo/metadata'
import { DateFormatter, ReadingProgress, Section } from '@repo/ui/components'
import Image from 'next/image'
import type * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { PortableText } from '~/app/cms/components/portable-text'
import type { BlogPostQueryQuery } from '~/app/cms/types'
import type { Locale } from '~/app/i18n/types'
import { getBlogPath } from '../utils'
import { BackToBlog } from './misc'

const prose = 'prose dark:prose-invert md:prose-lg lg:prose-xl max-w-4xl'

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
					url: heroImg
						? new URL(heroImg, env.NEXT_PUBLIC_URL).toString()
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
				<ReadingProgress offset={1200} />
				<Section className="max-w-4xl">
					<div className="mb-lg">
						<BackToBlog />
					</div>
					<header className={cx('flex max-w-4xl flex-col', prose)}>
						{date ? (
							<span
								className="mb-xs text-lg text-muted"
								data-tina-field={tinaField(data.blog, 'date')}
							>
								Published{' '}
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
					{heroImg ? (
						<div className={cx(prose, 'mx-auto mb-xl')}>
							<div
								className="overflow-hidden rounded-container"
								data-tina-field={tinaField(data.blog, 'heroImg')}
							>
								{/* TODO: add aria description */}
								<Image
									aria-hidden
									src={heroImg}
									alt={title}
									width={900}
									height={900}
								/>
							</div>
						</div>
					) : null}

					{body ? (
						<div className={prose}>
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

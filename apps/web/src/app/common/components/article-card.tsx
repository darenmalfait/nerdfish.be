'use client'

import { H3 } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import {
	CategoryIndicator,
	getCategoryColors,
	DateFormatter,
} from '@nerdfish-website/ui/components'
import Image from 'next/image'
import Link from 'next/link'

import { type Blog, type Work } from '~/app/cms'

function ArticleCard({
	title,
	heroImg,
	date,
	category,
	href,
	seo,
}: Partial<Blog | Work> & {
	href: string
}) {
	return (
		<div className="group relative w-full outline-none">
			<div className="sr-only">
				<h3>
					<Link href={href}>{title}</Link>
				</h3>
				{date ? (
					<p>
						<DateFormatter dateString={date} format="PPP" />
					</p>
				) : null}
				{category ? <p>category: {category}</p> : null}
				{seo?.description ? <p>{seo.description}</p> : null}
			</div>
			<Link href={href} aria-hidden>
				<div className="peer relative block w-full outline-none">
					<CategoryIndicator category={category} />

					{heroImg ? (
						<div
							className={cx(
								'aspect-h-4 aspect-w-3 shadow-outline ring-offset-inverted rounded-semi ring-transparent ring-offset-2 group-hover:ring-2 group-hover:ring-current group-focus:ring-2 group-focus:ring-current',
								getCategoryColors(category),
							)}
						>
							<Image
								className="rounded-semi absolute inset-0 size-full object-cover"
								src={heroImg}
								fill
								alt={title ?? ''}
							/>
						</div>
					) : (
						<div className="aspect-h-4 aspect-w-3">
							<div className="rounded-semi w-full transition">
								<div className="bg-accent inset-0" />
							</div>
						</div>
					)}

					<div className="mt-8 space-y-2">
						{date ? (
							<div className="text-muted text-xl font-bold">
								<DateFormatter dateString={date} format="PPP" />
							</div>
						) : null}
						<H3>{title}</H3>
					</div>
				</div>
			</Link>
		</div>
	)
}

export { ArticleCard }

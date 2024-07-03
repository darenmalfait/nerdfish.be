'use client'

import { H3 } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import {
	CategoryIndicator,
	getCategoryColors,
} from '@nerdfish-website/ui/components/category-indicator.tsx'
import { DateFormatter } from '@nerdfish-website/ui/components/date-formatter.tsx'
import Image from 'next/image'
import Link from 'next/link'

import { type Blog, type Work } from '~/app/cms'

function ArticleCard({
	title,
	heroImg,
	date = '',
	category,
	href,
	_sys,
}: Partial<Blog | Work> & {
	href: string
}) {
	return (
		<Link href={href} className="group relative w-full outline-none">
			<div className="peer relative block w-full outline-none">
				<CategoryIndicator category={category} />

				{heroImg ? (
					<div
						className={cx(
							'aspect-h-4 aspect-w-3 shadow-outline ring-offset-inverted rounded-lg ring-transparent ring-offset-2 group-hover:ring-2 group-hover:ring-current group-focus:ring-2 group-focus:ring-current',
							getCategoryColors(category),
						)}
					>
						<Image
							className="absolute inset-0 size-full rounded-lg object-cover"
							src={heroImg}
							fill
							alt={title ?? ''}
						/>
					</div>
				) : (
					<div className="aspect-h-4 aspect-w-3">
						<div className="w-full rounded-lg transition">
							<div className="bg-nerdfish inset-0" />
						</div>
					</div>
				)}

				<div className="space-y-2">
					{date ? (
						<div className="text-muted mt-8 text-xl font-bold">
							<DateFormatter dateString={date} format="PPP" />
						</div>
					) : null}
					<H3 as="div">{title}</H3>
				</div>
			</div>
		</Link>
	)
}

export { ArticleCard }

import { H2 } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import {
	CategoryIndicator,
	getCategoryColors,
} from '@nerdfish-website/ui/components/category-indicator.tsx'
import Image from 'next/image'
import Link from 'next/link'

import { ArrowLink } from './arrow-link'

interface HighlightCardProps {
	title?: string
	subtitle?: string
	cta?: string
	image?: string | null
	href: string
	className?: string
	category?: string
}

function HighlightCard({
	title,
	subtitle,
	cta = 'Read full article',
	href,
	image,
	className,
	category,
	...props
}: HighlightCardProps) {
	return (
		<Link
			className={cx(
				'block rounded-lg no-underline lg:bg-transparent',
				className,
			)}
			href={href}
			{...props}
		>
			<div className="bg-muted shadow-outline group relative grid w-full grid-cols-4 gap-x-4 rounded-lg px-8 pb-6 pt-14 md:grid-cols-8 md:pb-12 lg:grid-cols-12 lg:gap-x-6 lg:px-0">
				<div className="col-span-4 md:col-span-6 lg:col-span-5 lg:col-start-2 lg:flex lg:flex-col lg:justify-between">
					<div suppressHydrationWarning>
						{category ? (
							<CategoryIndicator
								className="!bg-inverted !text-inverted mb-8"
								category={category}
								inline
							/>
						) : null}
						<div>
							<H2 variant="primary" as="h3" className="mt-0">
								{title}
							</H2>
							<div className="text-primary mt-6 text-xl font-bold">
								{subtitle}
							</div>
						</div>
					</div>

					{href ? (
						<div className="mt-12 flex items-center justify-between">
							<ArrowLink>
								{cta}
								<div
									className={cx(
										'focus-ring absolute inset-0 z-10 rounded-lg',
										getCategoryColors(category ?? 'unknown'),
									)}
								/>
								<div className="-z-1 absolute inset-0 rounded-lg" />
							</ArrowLink>
						</div>
					) : null}
				</div>
				<div className="aspect-h-4 aspect-w-3 relative col-span-full mt-12 h-0 lg:col-span-4 lg:col-start-8 lg:mt-0">
					{image ? (
						<Image
							className="absolute inset-0 object-cover"
							src={image}
							fill
							alt={title ?? ''}
						/>
					) : null}
				</div>
			</div>
		</Link>
	)
}

export { HighlightCard }

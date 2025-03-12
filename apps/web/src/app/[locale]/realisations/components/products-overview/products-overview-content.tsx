'use client'

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	Grid,
	GridCard,
	Skeleton,
} from '@repo/design-system/components/ui'
import { GithubIcon, GlobeIcon } from '@repo/design-system/icons'
import { cx } from '@repo/lib/utils/base'
import { type Product } from 'content-collections'
import Link from 'next/link'

function ProductItem({
	title,
	url,
	sourceUrl,
	description,
	image,
}: Partial<Product>) {
	const hasExternalLink = url ?? sourceUrl

	return (
		<>
			<div />
			<div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-focus-within:-translate-y-10 group-hover:-translate-y-10">
				{image?.src ? (
					<Avatar className="text-foreground size-12 origin-left transform-gpu transition-all duration-300 ease-in-out group-focus-within:scale-75 group-hover:scale-75">
						<AvatarImage
							src={image.src}
							className="object-cover"
							alt={image.alt}
						/>
						<AvatarFallback>
							<Skeleton className="size-full" />
						</AvatarFallback>
					</Avatar>
				) : null}
				<h3 className="text-foreground text-xl font-bold">{title}</h3>
				<p className="text-foreground-muted max-w-lg">{description}</p>
				<span
					className="block truncate whitespace-nowrap font-bold"
					aria-hidden
				>
					{url?.replace('https://', '')}
				</span>
			</div>
			{hasExternalLink ? (
				<div
					className={cx(
						'pointer-events-none absolute bottom-0 z-10 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100',
					)}
				>
					<div className="flex gap-2">
						{url ? (
							<Button
								variant="default"
								asChild
								size="xs"
								className="pointer-events-auto"
							>
								<Link
									href={url}
									target="_blank"
									rel="noreferrer"
									aria-label={`link to ${title}`}
								>
									<GlobeIcon className="mr-2 size-4" />
									Website
								</Link>
							</Button>
						) : null}
						{sourceUrl ? (
							<Button
								variant="default"
								asChild
								size="xs"
								className="pointer-events-auto"
							>
								<Link
									href={sourceUrl}
									target="_blank"
									rel="noreferrer"
									aria-label={`source code for ${title}`}
								>
									<GithubIcon className="mr-2 size-4" />
									Source
								</Link>
							</Button>
						) : null}
					</div>
				</div>
			) : null}

			<div className="group-focus-within:bg-popover group-hover:bg-popover pointer-events-none absolute inset-0 transform-gpu transition-all duration-300" />
		</>
	)
}

export interface ProductsOverviewContentProps {
	products: Product[]
}

export function ProductsOverviewContent({
	products,
}: ProductsOverviewContentProps) {
	return (
		<div className="space-y-6">
			<Grid asChild className="auto-rows-[15rem]">
				<ul>
					{products.map((product) => (
						<GridCard
							key={product.id}
							className="bg-background-muted lg:col-span-1"
							asChild
						>
							<li>
								<ProductItem {...product} />
							</li>
						</GridCard>
					))}
				</ul>
			</Grid>
		</div>
	)
}

'use client'

import { cx } from '@nerdfish/utils'
import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/design-system/components/section'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Badge,
	Button,
	Grid,
	GridCard,
	Skeleton,
} from '@repo/design-system/components/ui'
import { GithubIcon, GlobeIcon } from '@repo/design-system/lib/icons'
import Link from 'next/link'
import { tinaField } from 'tinacms/dist/react'
import {
	type Block,
	type PageBlocksProducts,
	type Product,
} from '~/app/cms/types'

function ProductItem({
	title,
	link,
	sourceUrl,
	description,
	soon,
	imageSrc,
}: Partial<Product>) {
	const hasExternalLink = link ?? sourceUrl

	return (
		<>
			<div />
			<div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-focus-within:-translate-y-10 group-hover:-translate-y-10">
				{imageSrc ? (
					<Avatar className="text-primary size-12 origin-left transform-gpu transition-all duration-300 ease-in-out group-focus-within:scale-75 group-hover:scale-75">
						<AvatarImage
							src={imageSrc}
							className="object-cover"
							alt={`${title} logo`}
						/>
						<AvatarFallback>
							<Skeleton className="size-full" />
						</AvatarFallback>
					</Avatar>
				) : null}
				<h3 className="text-primary text-xl font-bold">{title}</h3>
				<p className="text-muted max-w-lg">{description}</p>
				<span
					className="block truncate whitespace-nowrap font-bold"
					aria-hidden
				>
					{soon ? (
						<Badge variant="success">Soon</Badge>
					) : (
						link?.replace('https://', '')
					)}
				</span>
			</div>
			{hasExternalLink ? (
				<div
					className={cx(
						'pointer-events-none absolute bottom-0 z-10 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100',
					)}
				>
					<div className="flex gap-2">
						{link ? (
							<Button
								variant="default"
								asChild
								size="xs"
								className="pointer-events-auto"
							>
								<Link
									href={link}
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

export function ProductsBlock(data: Block<PageBlocksProducts>) {
	const { header, globalData = {} } = data

	const { products: allProducts = [] } = globalData
	const { title, subtitle, link } = header ?? {}

	return (
		<Section>
			{(title ?? subtitle) ? (
				<div data-tina-field={tinaField(data, 'header')} className="mb-6">
					<SectionHeader
						cta={{
							title: 'See all products',
							url: link ?? '',
						}}
					>
						<SectionHeaderTitle>{title}</SectionHeaderTitle>
						<SectionHeaderSubtitle>{subtitle}</SectionHeaderSubtitle>
					</SectionHeader>
				</div>
			) : null}
			<div data-tina-field={tinaField(data, 'header')} className="space-y-6">
				<Grid asChild className="auto-rows-[15rem]">
					<ul>
						{allProducts.map((product) => (
							<GridCard
								key={product.id ?? product.title}
								className="bg-muted lg:col-span-1"
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
		</Section>
	)
}

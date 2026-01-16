import { Avatar, AvatarFallback, AvatarImage } from '@nerdfish/react/avatar'
import { Button } from '@nerdfish/react/button'
import { Skeleton } from '@nerdfish/react/skeleton'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@repo/design-system/components/carousel'
import { Section } from '@repo/design-system/components/section'
import { GithubIcon, GlobeIcon } from '@repo/design-system/icons'
import { getTranslations } from '@repo/i18n/server'
import { type Locale, type WithLocale } from '@repo/i18n/types'
import { cn } from '@repo/lib/utils/class'
import { pageParams } from '@repo/og-utils/zod-params'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { Body } from '../../components/body'
import { product as productApi } from '../api'
import { getProductPath } from '../utils'

type PageProps = {
	params: Promise<WithLocale<{ slug: string[] }>>
}

const getPageData = cache(async function getPageData(
	slug: string,
	locale?: Locale,
) {
	const product = await productApi.get({
		slug: decodeURIComponent(slug),
		locale,
	})

	if (!product) return notFound()

	return {
		product,
	}
})

export async function generateMetadata(
	props: PageProps,
): Promise<Metadata | undefined> {
	const { slug, locale } = await props.params
	const { product } = await getPageData(slug.join('/'), locale)
	const title = product.seo.title

	return createMetadata({
		title,
		description: product.seo.description,

		image:
			product.seo.image ??
			`/api/og?${pageParams.toSearchString({
				heading: title,
			})}`,
		alternates: {
			canonical: product.seo.canonical ?? getProductPath(product),
		},
		locale,
	})
}

export default async function ProductDetailPage(props: PageProps) {
	const { slug, locale } = await props.params

	const [{ product }, t] = await Promise.all([
		getPageData(slug.join('/'), locale),
		getTranslations('product.content'),
	])

	return (
		<>
			<Section className="mx-auto max-w-4xl">
				<div className="gap-x-friends mb-acquaintances flex w-full items-center">
					<Avatar className="text-foreground rounded-subtle size-20 overflow-hidden">
						<AvatarImage
							src={product.icon.src}
							className="object-cover"
							alt={product.icon.alt}
						/>
						<AvatarFallback>
							<Skeleton className="size-full" />
						</AvatarFallback>
					</Avatar>
					<div className="min-w-0">
						<h2 className="typography-heading">{product.title}</h2>
						<p>{product.description}</p>
					</div>
				</div>
				<div className="gap-casual flex flex-col justify-between md:flex-row">
					<div className="shrink grow-2 basis-0">
						<h2 className="typography-heading-sm mb-casual">{t('about')}</h2>
						<div className="typography mx-auto max-w-4xl">
							<Body content={product.body} />
						</div>
					</div>
					<div className="flex-1 items-stretch">
						<div className="gap-best-friends flex flex-col">
							{product.url ? (
								<Button
									size="lg"
									render={
										<Link target="_blank" href={product.url}>
											<GlobeIcon className="size-4" />
											{t('open')}
										</Link>
									}
									className="gap-best-friends flex w-full"
								/>
							) : null}
							{product.sourceUrl ? (
								<Button
									variant="secondary"
									size="lg"
									render={
										<Link target="_blank" href={product.sourceUrl}>
											<GithubIcon className="size-4" />
											{t('source')}
										</Link>
									}
									className="gap-best-friends flex w-full"
								/>
							) : null}
						</div>
					</div>
				</div>
			</Section>
			{product.images?.length ? (
				<Section className="max-w-none px-0">
					<Carousel opts={{ loop: true, align: 'center' }}>
						<CarouselContent className="p-bff">
							{product.images.map((image, index) => (
								<CarouselItem index={index} key={index}>
									<div className="border-border/20 rounded-base relative aspect-3/4 w-full overflow-hidden border shadow-md">
										<Image
											src={image.src}
											alt={image.alt}
											className="absolute inset-0 size-full object-cover"
											width={500}
											height={500}
										/>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<div className="container">
							<div className="flex w-auto items-center justify-end">
								<div className="gap-friends rounded-base p-friends md:hover:bg-background-inverted group flex transition duration-300 hover:scale-110">
									<CarouselPrevious
										variant="link"
										className={cn(
											'active:-translate-x-bff rounded-base focus-visible:outline-active group-hover:text-foreground-inverted! transition duration-300 outline-none group-hover:opacity-25 hover:opacity-100!',
											'[&_svg]:size-8!',
										)}
									/>
									<CarouselNext
										variant="link"
										className={cn(
											'rounded-base focus-visible:outline-active active:translate-x-bff group-hover:text-foreground-inverted! transition duration-300 outline-none group-hover:opacity-25 hover:opacity-100!',
											'[&_svg]:size-8!',
										)}
									/>
								</div>
							</div>
						</div>
					</Carousel>
				</Section>
			) : null}
		</>
	)
}

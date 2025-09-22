import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@repo/design-system/components/carousel'
import { Section } from '@repo/design-system/components/section'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	H2,
	H3,
	Skeleton,
} from '@repo/design-system/components/ui'
import { GithubIcon, GlobeIcon } from '@repo/design-system/icons'
import { getTranslations } from '@repo/i18n/server'
import { type Locale, type WithLocale } from '@repo/i18n/types'
import { pageParams } from '@repo/og-utils/zod-params'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { product as productApi } from '../api'
import { getProductPath } from '../utils'
import { Body } from '~/app/components/body'

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

const prose = 'prose md:prose-lg lg:prose-xl max-w-4xl mx-auto'

export default async function ProductDetailPage(props: PageProps) {
	const { slug, locale } = await props.params

	const [{ product }, t] = await Promise.all([
		getPageData(slug.join('/'), locale),
		getTranslations('product.content'),
	])

	return (
		<>
			<Section className="mx-auto max-w-4xl">
				<div className="gap-x-md mb-xl flex w-full items-center">
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
						<H2 variant="primary" as="h1">
							{product.title}
						</H2>
						<p>{product.description}</p>
					</div>
				</div>
				<div className="gap-lg flex flex-col justify-between md:flex-row">
					<div className="flex-shrink flex-grow-[2] basis-0">
						<H3 as="h2" className="mb-lg">
							{t('about')}
						</H3>
						<div className={prose}>
							<Body content={product.body} />
						</div>
					</div>
					<div className="flex-1 items-stretch">
						<div className="gap-sm flex flex-col">
							{product.url ? (
								<Button asChild className="gap-sm flex w-full">
									<Link target="_blank" href={product.url}>
										<GlobeIcon className="size-4" />
										{t('open')}
									</Link>
								</Button>
							) : null}
							{product.sourceUrl ? (
								<Button
									variant="secondary"
									asChild
									className="gap-sm flex w-full"
								>
									<Link target="_blank" href={product.sourceUrl}>
										<GithubIcon className="size-4" />
										{t('source')}
									</Link>
								</Button>
							) : null}
						</div>
					</div>
				</div>
			</Section>
			{product.images?.length ? (
				<Section>
					<Carousel>
						<CarouselContent className="p-xs">
							{product.images.map((image) => (
								<CarouselItem
									key={image.src}
									className="md:basis-1/2 lg:basis-1/3"
								>
									<div className="shadow-outline rounded-base aspect-w-4 aspect-h-3 overflow-hidden">
										<Image
											src={image.src}
											alt={image.alt}
											className="absolute inset-0 object-cover"
											width={500}
											height={500}
										/>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</Section>
			) : null}
		</>
	)
}

import { getTranslations } from '@repo/i18n/server'
import { type Locale, type WithLocale } from '@repo/i18n/types'
import { pageParams } from '@repo/og-utils/zod-params'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { product as productApi } from '~/features/product/api'
import { ProductContent } from '~/features/product/components/product-content'
import { getProductPath } from '~/features/product/utils'

type PageProps = {
	params: Promise<WithLocale<{ slug: string[] }>>
}

const getPageData = cache(async function fetchPageData(
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
		<ProductContent
			product={product}
			labels={{
				about: t('about'),
				open: t('open'),
				source: t('source'),
			}}
		/>
	)
}

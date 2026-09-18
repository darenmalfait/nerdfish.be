import { type WithLocale } from '@repo/i18n/types'
import { pageParams } from '@repo/og-utils/zod-params'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
	ProductDetailPage,
	getProductPath,
	product as productApi,
} from '~/features/product'

type PageProps = {
	params: Promise<WithLocale<{ slug: string[] }>>
}

export async function generateMetadata(
	props: PageProps,
): Promise<Metadata | undefined> {
	const { slug, locale } = await props.params
	const product = await productApi.get({
		slug: decodeURIComponent(slug.join('/')),
		locale,
	})

	if (!product) return notFound()

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

export default ProductDetailPage

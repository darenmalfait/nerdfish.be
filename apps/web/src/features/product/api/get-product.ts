import { type Locale } from '@repo/i18n/types'
import { allProducts } from 'content-collections'

export async function getProduct({
	slug,
	locale,
}: {
	slug: string
	locale?: Locale
}) {
	return allProducts.find(
		(item) => item.slug === slug && item.locale === locale,
	)
}

import { allProducts } from 'content-collections'

import { type Locale } from '@repo/i18n/types'

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

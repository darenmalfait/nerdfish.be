import { type Product } from 'content-collections'

import { i18n } from '@repo/i18n/config'
import { type PartialDeep } from '@repo/lib/types'

export function getProductPath(post: PartialDeep<Product>) {
	const locale = post.locale

	const localePath = locale === i18n.defaultLocale ? '' : `/${locale}`
	const productPath = `/product/${post.slug}`

	return `${localePath}${productPath}`
}

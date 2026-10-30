import { allProducts } from 'content-collections'

import { type Locale } from '@repo/i18n/types'

import { filterByLocale } from '~/utils/filter-by-locale'

export async function getProducts({ locale }: { locale?: Locale } = {}) {
	return filterByLocale(allProducts, locale)
}

import { allTestimonials } from 'content-collections'

import { type Locale } from '@repo/i18n/types'

import { filterByLocale } from '~/utils/filter-by-locale'

export async function getTestimonials({ locale }: { locale?: Locale } = {}) {
	return filterByLocale(allTestimonials, locale)
}

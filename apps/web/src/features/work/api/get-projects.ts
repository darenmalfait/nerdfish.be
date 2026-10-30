import { type Locale } from '@repo/i18n/types'
import { allProjects } from 'content-collections'

import { byDateDesc } from '~/utils/by-date-desc'
import { filterByLocale } from '~/utils/filter-by-locale'

export async function getProjects({ locale }: { locale?: Locale } = {}) {
	return filterByLocale(allProjects, locale).toSorted(byDateDesc)
}

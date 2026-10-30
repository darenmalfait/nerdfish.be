import { type Locale } from '@repo/i18n/types'
import { allPosts } from 'content-collections'

import { byDateDesc } from '~/utils/by-date-desc'
import { filterByLocale } from '~/utils/filter-by-locale'

export async function getPosts({ locale }: { locale?: Locale } = {}) {
	return filterByLocale(allPosts, locale).toSorted(byDateDesc)
}

import { type PartialDeep } from '@repo/lib/utils/types'
import { type Page } from '~/app/cms/types'
import { i18n } from '~/app/i18n/config'

export function getPagePath(page: PartialDeep<Page>) {
	const path = page._sys?.breadcrumbs?.join('/')
	const locale = page._sys?.breadcrumbs?.[0]

	const newPath = path?.replace(`${locale}/`, '/') ?? ''

	if (locale === i18n.defaultLocale) return newPath
	return `/${locale}${newPath}`
}

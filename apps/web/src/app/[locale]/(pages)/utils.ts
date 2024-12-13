import { type PartialDeep } from '@repo/design-system/lib/utils/types'
import { i18n } from '@repo/i18n/config'
import { type Page } from '~/app/cms/types'

export function getPagePath(page: PartialDeep<Page>) {
	const path = page._sys?.breadcrumbs?.join('/')
	const locale = page._sys?.breadcrumbs?.[0]

	if (page._sys?.filename === 'home')
		return locale === i18n.defaultLocale ? '/' : `/${locale}`

	const newPath = path?.replace(`${locale}/`, '/') ?? ''

	if (locale === i18n.defaultLocale) return newPath
	return `/${locale}${newPath}`
}

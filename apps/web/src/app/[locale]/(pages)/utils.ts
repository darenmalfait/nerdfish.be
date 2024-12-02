import { type PartialDeep } from '@repo/lib/utils/types'
import { type Page } from '~/app/cms/types'

export function getPagePath(page: PartialDeep<Page>) {
	const path = page._sys?.breadcrumbs?.join('/')

	const locale = page._sys?.breadcrumbs?.[0]
	const newPath = path?.replace(`${locale}/`, '/')

	return newPath ? `${locale ? `/${locale}` : ''}${newPath}` : ''
}

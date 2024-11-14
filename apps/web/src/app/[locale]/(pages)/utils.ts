import { type PartialDeep } from '@nerdfish-website/lib/utils'
import { type Page } from '~/app/cms'

export function getPagePath(page: PartialDeep<Page>) {
	const path = page._sys?.breadcrumbs?.join('/')

	const locale = page._sys?.breadcrumbs?.[0]
	const newPath = path?.replace(`${locale}/`, '/')

	return newPath ? `${locale ? `/${locale}` : ''}${newPath}` : ''
}

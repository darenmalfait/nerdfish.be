import { i18n } from '@repo/i18n/config'
import { type Locale } from '@repo/i18n/types'
import { tina } from '~/app/cms/client'
import {
	type ContentQueryQuery,
	type Product,
	type Wiki,
	type Work,
} from '~/app/cms/types'

export async function getPages() {
	const pageDate = await tina.queries.pageConnection()

	return pageDate.data.pageConnection.edges?.map((item) => ({
		...item?.node,
	}))
}

export function mapPageData(data: ContentQueryQuery) {
	return {
		...data,
		wikis: data.wikiConnection.edges?.map((item) => ({
			...(item?.node ?? {}),
		})) as Wiki[],
		works: data.workConnection.edges?.map((item) => ({
			...(item?.node ?? {}),
		})) as Work[],
		products: data.productConnection.edges?.map((item) => ({
			...(item?.node ?? {}),
		})) as Product[],
	}
}

export async function getPage(
	relativePath: string,
	lang: Locale = i18n.defaultLocale,
) {
	const path = `${lang}/${relativePath}`

	const page = await tina.queries
		.contentQuery({
			relativePath: path,
		})
		.catch(() => null)

	if (!page) return null

	return {
		...page,
		data: mapPageData(page.data),
	}
}

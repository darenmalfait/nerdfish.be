import { i18n } from '@repo/i18n/config'
import { type Locale } from '@repo/i18n/types'
import tina from '~/tina/__generated__/client'

export async function getGlobalData(locale: Locale = i18n.defaultLocale) {
	const globalData = await tina.queries
		.globalQuery({
			relativePath: `${locale}/index.json`,
		})
		.catch(() => null)

	if (!globalData) throw new Error('Global data not found')

	return globalData.data.global
}

export async function getSitemapData() {
	const { data } = await tina.queries.sitemapQuery()
	return {
		pages: data.pageConnection.edges?.map((item) => ({
			...item?.node,
		})),
		works: data.workConnection.edges
			?.map((item) => ({
				...item?.node,
			}))
			.reverse(),
	}
}

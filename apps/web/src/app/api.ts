import { tina } from './cms'
import { i18n, type Locale } from '~/i18n-config'

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
		blogs: data.blogConnection.edges?.map((item) => ({
			...item?.node,
		})),
		works: data.workConnection.edges
			?.map((item) => ({
				...item?.node,
			}))
			.reverse(),
		wikis: data.wikiConnection.edges
			?.map((item) => ({
				...item?.node,
			}))
			.reverse(),
	}
}

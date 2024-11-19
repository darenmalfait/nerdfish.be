import { type MetadataRoute } from 'next'
import { getBlogPath } from './[locale]/blog/utils'
import { getWikiPath } from './[locale]/wiki/utils'
import { getWorkPath } from './[locale]/work/utils'
import { getSitemapData } from './cms/api'
import { supportedLanguages } from './i18n'

const BASE_URL = process.env.NEXT_PUBLIC_URL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const data = await getSitemapData()

	return [
		{
			url: `${BASE_URL}/`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
		},
		...supportedLanguages.map((locale) => {
			return {
				url: `${BASE_URL}/${locale.code}`,
				lastModified: new Date(),
				changeFrequency: 'monthly',
				priority: 1,
			}
		}),
		...(data.pages?.map((page) => {
			return {
				url: `${BASE_URL}/${page._sys?.breadcrumbs.join('/')}`,
				lastModified: new Date(),
				priority: 1,
			}
		}) ?? []),
		...(data.works?.map((work) => {
			return {
				url: `${BASE_URL}${getWorkPath(work)}`,
				lastModified: new Date(),
				priority: 0.9,
			}
		}) ?? []),
		...(data.blogs?.map((blog) => {
			return {
				url: `${BASE_URL}${getBlogPath(blog)}`,
				lastModified: new Date(),
				priority: 0.8,
			}
		}) ?? []),
		...(data.wikis?.map((wiki) => {
			return {
				url: `${BASE_URL}${getWikiPath(wiki)}`,
				lastModified: new Date(wiki.date ?? ''),
				priority: 0.5,
			}
		}) ?? []),
	]
}

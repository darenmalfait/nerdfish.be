import { env } from '@repo/env'
import { type MetadataRoute } from 'next'
import { getPagePath } from './[locale]/(pages)/utils'
import { getBlogPath } from './[locale]/blog/utils'
import { getWikiPath } from './[locale]/wiki/utils'
import { getWorkPath } from './[locale]/work/utils'
import { getSitemapData } from './cms/api'
import { i18n, supportedLanguages } from './i18n/config'

const BASE_URL = env.NEXT_PUBLIC_URL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const data = await getSitemapData()

	return [
		{
			url: `${BASE_URL}/`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
		},
		...supportedLanguages
			.filter(({ default: isDefault }) => !isDefault)
			.map((locale) => {
				const language =
					locale.code === i18n.defaultLocale ? '' : `/${locale.code}`

				return {
					url: `${BASE_URL}${language}`,
					lastModified: new Date(),
					changeFrequency: 'monthly',
					priority: 1,
				}
			}),
		...(data.pages
			?.filter(({ _sys }) => _sys?.filename !== 'home')
			.map((page) => {
				return {
					url: `${BASE_URL}${getPagePath(page)}`,
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

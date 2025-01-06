import { env } from '@repo/env'
import { i18n, supportedLanguages } from '@repo/i18n/config'
import { type MetadataRoute } from 'next'
import { getPagePath } from './[locale]/(tina)/utils'
import { blog } from './[locale]/blog/api'
import { getBlogPath } from './[locale]/blog/utils'
import { wiki } from './[locale]/wiki/api'
import { getWikiPath } from './[locale]/wiki/utils'
import { work } from './[locale]/work/api'
import { getWorkPath } from './[locale]/work/utils'
import { getSitemapData } from './cms/api'

const BASE_URL = env.NEXT_PUBLIC_URL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const data = await getSitemapData()
	const [wikis, posts, works] = await Promise.all([
		wiki.getAll(),
		blog.getAll(),
		work.getAll(),
	])

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
		...works.map((item) => {
			return {
				url: `${BASE_URL}${getWorkPath(item)}`,
				lastModified: new Date(),
				priority: 0.9,
			}
		}),
		...posts.map((item) => {
			return {
				url: `${BASE_URL}${getBlogPath(item)}`,
				lastModified: new Date(),
				priority: 0.8,
			}
		}),
		...wikis.map((item) => {
			return {
				url: `${BASE_URL}${getWikiPath(item)}`,
				lastModified: new Date(item.date),
				priority: 0.5,
			}
		}),
	]
}

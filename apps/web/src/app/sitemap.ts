import { supportedLanguages } from '@repo/i18n/config'
import { env } from 'env'
import { type MetadataRoute } from 'next'
import { basePathNames, getPathname, type Pathnames } from 'routing'
import { blog } from './[locale]/(website)/blog/api'
import { getBlogPath } from './[locale]/(website)/blog/utils'
import { work } from './[locale]/(website)/work/api'
import { getWorkPath } from './[locale]/(website)/work/utils'

const BASE_URL = env.NEXT_PUBLIC_URL

const nonDefaultLanguages = supportedLanguages
	.filter(({ default: isDefault }) => !isDefault)
	.map(({ code }) => code)

function getEntriesForPath(href: Pathnames) {
	return {
		url: `${BASE_URL}${href}`,
		lastModified: new Date(),
		changeFrequency: 'monthly',
		priority: 1,
		alternates: {
			languages: Object.fromEntries(
				nonDefaultLanguages.map((locale) => [
					locale,
					`${BASE_URL}${getPathname({ locale, href })}`,
				]),
			),
		},
	}
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const [posts, works] = await Promise.all([blog.getAll(), work.getAll()])

	return [
		// base paths
		...Object.keys(basePathNames).map((path) =>
			getEntriesForPath(path as Pathnames),
		),

		// TODO: refactor to alternate languages
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
	]
}

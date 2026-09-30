import { i18n } from '@repo/i18n/config'
import { env } from 'env'
import { type MetadataRoute } from 'next'
import { basePathNames, getAlternateLanguages, type Pathnames } from 'routing'
import { blog } from '~/features/blog/api'
import { getBlogPath } from '~/features/blog/utils'
import { product } from '~/features/product/api'
import { getProductPath } from '~/features/product/utils'
import {
	buildLocalizedSitemapEntries,
	getSlugLanguageAlternates,
} from '~/features/shared/content/locale-alternates'
import { work } from '~/features/work/api'
import { getWorkPath } from '~/features/work/utils'

const BASE_URL = env.NEXT_PUBLIC_URL

function toAbsolute(pathname: string) {
	return `${BASE_URL}${pathname}`
}

const sitemapPathPriority: Partial<Record<Pathnames, number>> = {
	'/wiki': 0.3,
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const [posts, works, products] = await Promise.all([
		blog.getAll(),
		work.getAll(),
		product.getAll(),
	])

	const baseEntries = (Object.keys(basePathNames) as Pathnames[]).map(
		(path) => {
			const languages = getAlternateLanguages(path, { toAbsolute })
			const url = languages[i18n.defaultLocale]
			if (!url) {
				throw new Error(`Missing default locale URL for ${path}`)
			}

			return {
				url,
				lastModified: new Date(),
				changeFrequency: 'monthly' as const,
				priority: sitemapPathPriority[path] ?? 1,
				alternates: { languages },
			}
		},
	)

	const workEntries = buildLocalizedSitemapEntries(
		works,
		getWorkPath,
		0.9,
		toAbsolute,
	)
	const postEntries = buildLocalizedSitemapEntries(
		posts,
		getBlogPath,
		0.8,
		toAbsolute,
	)

	const productEntries = products
		.filter((item) => item.locale === i18n.defaultLocale)
		.map((item) => {
			const languages = getSlugLanguageAlternates(
				item.slug,
				(locale) => getProductPath({ slug: item.slug, locale }),
				toAbsolute,
			)

			return {
				url: toAbsolute(getProductPath(item)),
				lastModified: new Date(),
				priority: 0.7,
				alternates: { languages },
			}
		})

	return [...baseEntries, ...workEntries, ...postEntries, ...productEntries]
}

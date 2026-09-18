import { type Article } from '@repo/design-system/components/article-overview'
import { i18n } from '@repo/i18n/config'
import { type PartialDeep } from '@repo/lib/types'
import { nonNullable } from '@repo/lib/utils/array'
import { getCrypto } from '@repo/lib/utils/misc'
import { type Project } from 'content-collections'

export function getWorkPath(post: PartialDeep<Project>) {
	const locale = post.locale

	const localePath = locale === i18n.defaultLocale ? '' : `/${locale}`
	const blogPath = `/work/${post.slug}`

	return `${localePath}${blogPath}`
}

export function toArticleFromWork(item: PartialDeep<Project>): Article {
	return {
		id: item.id ?? getCrypto().randomUUID(),
		title: item.title ?? 'untitled',
		description: item.excerpt,
		href: getWorkPath(item),
		tags: nonNullable(item.tags ?? []),
		category: item.category,
		date: item.date,
		image: item.heroImg?.src
			? {
					src: item.heroImg.src,
					alt: item.heroImg.alt ?? item.title ?? 'untitled',
				}
			: undefined,
		base64Placeholder: item.imageBlur,
	}
}

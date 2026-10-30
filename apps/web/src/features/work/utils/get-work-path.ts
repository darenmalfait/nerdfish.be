import { i18n } from '@repo/i18n/config'
import { type PartialDeep } from '@repo/lib/types'
import { type Project } from 'content-collections'

export function getWorkPath(post: PartialDeep<Project>) {
	const locale = post.locale

	const localePath = locale === i18n.defaultLocale ? '' : `/${locale}`
	const blogPath = `/work/${post.slug}`

	return `${localePath}${blogPath}`
}

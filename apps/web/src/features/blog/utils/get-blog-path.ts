import { type Post } from 'content-collections'

import { i18n } from '@repo/i18n/config'
import { type PartialDeep } from '@repo/lib/types'

export function getBlogPath(post: PartialDeep<Post>) {
	const locale = post.locale

	const localePath = locale === i18n.defaultLocale ? '' : `/${locale}`
	const blogPath = `/blog/${post.slug}`

	return `${localePath}${blogPath}`
}

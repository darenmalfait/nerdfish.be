import { type Locale } from '@repo/i18n/types'
import { allPosts } from 'content-collections'

export async function getPost({
	slug,
	locale,
}: {
	slug: string
	locale?: Locale
}) {
	return allPosts.find((item) => item.slug === slug && item.locale === locale)
}

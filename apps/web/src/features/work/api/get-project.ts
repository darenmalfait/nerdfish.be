import { type Locale } from '@repo/i18n/types'
import { allProjects } from 'content-collections'

export async function getProject({
	slug,
	locale,
}: {
	slug: string
	locale?: Locale
}) {
	return allProjects.find(
		(item) => item.slug === slug && item.locale === locale,
	)
}

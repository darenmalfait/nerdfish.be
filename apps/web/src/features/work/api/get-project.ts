import { allProjects } from 'content-collections'

import { type Locale } from '@repo/i18n/types'

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

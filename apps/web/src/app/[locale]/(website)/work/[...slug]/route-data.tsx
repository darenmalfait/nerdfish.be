import { cache } from 'react'
import { notFound } from 'next/navigation'

import { type Locale } from '@repo/i18n/types'

import { getProject } from '~/features/work/api/get-project'

export const getRouteData = cache(async function fetchRouteData(
	slug: string,
	locale?: Locale,
) {
	const work = await getProject({
		slug,
		locale,
	})

	if (!work) return notFound()

	return { work }
})

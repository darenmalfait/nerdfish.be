import { cache } from 'react'
import { notFound } from 'next/navigation'

import { getWiki } from '~/features/wiki/api/get-wiki'

export const getRouteData = cache(async function fetchRouteData(slug: string) {
	const result = await getWiki({ slug: decodeURIComponent(slug) })

	if (!result) return notFound()

	return {
		wiki: result,
	}
})

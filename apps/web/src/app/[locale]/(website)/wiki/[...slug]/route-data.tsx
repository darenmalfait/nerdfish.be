import { cache } from 'react'
import { notFound } from 'next/navigation'

import { wiki } from '~/features/wiki/api'

export const getRouteData = cache(async function fetchRouteData(slug: string) {
	const result = await wiki.get({ slug: decodeURIComponent(slug) })

	if (!result) return notFound()

	return {
		wiki: result,
	}
})

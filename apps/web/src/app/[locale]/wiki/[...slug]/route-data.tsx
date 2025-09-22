import { notFound } from 'next/navigation'
import { cache } from 'react'
import { wiki } from '../api'

export const getRouteData = cache(async function getRouteData(slug: string) {
	const result = await wiki.get(decodeURIComponent(slug))

	if (!result) return notFound()

	return {
		wiki: result,
	}
})

import { notFound } from 'next/navigation'
import * as React from 'react'
import { wiki } from '../api'

export const getRouteData = React.cache(async function getRouteData(
	slug: string,
) {
	const result = await wiki.get(decodeURIComponent(slug))

	if (!result) return notFound()

	return {
		wiki: result,
	}
})

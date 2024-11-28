import { notFound } from 'next/navigation'
import * as React from 'react'
import { getWikiPost } from '../api'

export const getRouteData = React.cache(async function getRouteData(
	slug: string
) {
	const relativePath = `${decodeURIComponent(slug)}.mdx`

	const result = await getWikiPost(relativePath)

	if (!result) return notFound()

	return result
})

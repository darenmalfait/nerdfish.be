import { notFound } from 'next/navigation'
import * as React from 'react'

import { getBlogPost } from '../api'

export const getRouteData = React.cache(async function getRouteData(
	slug: string,
) {
	const relativePath = `${decodeURIComponent(slug)}.mdx`

	const result = await getBlogPost(relativePath)

	if (!result) return notFound()

	return result
})

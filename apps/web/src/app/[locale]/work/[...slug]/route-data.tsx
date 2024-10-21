import { notFound } from 'next/navigation'
import * as React from 'react'
import { getWork } from '~/app/[locale]/work/api'

export const getRouteData = React.cache(async function getRouteData(
	slug: string,
) {
	const relativePath = `${decodeURIComponent(slug)}.mdx`

	const result = await getWork(relativePath)

	if (!result) return notFound()

	return result
})

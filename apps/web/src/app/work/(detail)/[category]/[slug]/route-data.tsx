import { notFound } from 'next/navigation'
import * as React from 'react'

import { getWork } from '~/app/work/api'

function getPath(slug: string, category: string) {
	return `${category}/${slug}.mdx`
}

export const getRouteData = React.cache(async function getRouteData(
	slugProp: string,
	categoryProp: string,
) {
	const slug = decodeURIComponent(slugProp)
	const category = decodeURIComponent(categoryProp)

	if (!slug || !category) return notFound()

	const filename = getPath(slug, category)
	const result = await getWork(filename)

	if (!result) return notFound()

	return result
})

import { notFound } from 'next/navigation'
import * as React from 'react'

import { getBlogPost } from '~/app/blog/api'

function getPath(slug?: string, year?: string, month?: string) {
	let path = `${slug}.mdx`

	if (year && month) {
		path = `${year}/${month}/${path}`
	}

	return path
}

export const getRouteData = React.cache(async function getRouteData(
	slugProp: string,
	yearProp: string,
	monthProp: string,
) {
	const slug = decodeURIComponent(slugProp)
	const year = decodeURIComponent(yearProp)
	const month = decodeURIComponent(monthProp)

	if (!slug && !year && !month) return notFound()

	const filename = getPath(slug, year, month)

	const result = await getBlogPost(filename)

	if (!result) return notFound()

	return result
})

import { type Locale } from '@repo/i18n/types'
import { notFound } from 'next/navigation'
import * as React from 'react'
import { getBlogPost } from '../api'

export const getRouteData = React.cache(async function getRouteData(
	slug: string,
	locale?: Locale,
) {
	const relativePath = `${locale ? `${locale}/` : ''}${decodeURIComponent(slug)}.mdx`

	const result = await getBlogPost(relativePath)

	if (!result) return notFound()

	return result
})

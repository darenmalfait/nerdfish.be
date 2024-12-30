import { type Locale } from '@repo/i18n/types'
import { notFound } from 'next/navigation'
import * as React from 'react'
import { blog } from '../api'

export const getRouteData = React.cache(async function getRouteData(
	slug: string,
	locale?: Locale,
) {
	const post = await blog.getPost({ slug: decodeURIComponent(slug), locale })

	if (!post) return notFound()

	return {
		post,
	}
})

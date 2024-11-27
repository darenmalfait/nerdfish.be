import { stripTrailingSlash } from '@repo/lib/utils'
import { notFound } from 'next/navigation'
import * as React from 'react'
import { getPage } from '../api'
import { type Locale } from '~/app/i18n'

// slug is empty string when on the homepage
export const getRouteData = React.cache(async function getRouteData(
	slugProp?: string,
	lang?: Locale,
) {
	const slug = decodeURIComponent(slugProp ?? '')

	const filename =
		!slug || slug === '/' ? 'home' : stripTrailingSlash(slug.toLowerCase())

	const result = await getPage(
		`${filename.length ? filename : 'home'}.mdx`,
		lang,
	)

	if (!result) return notFound()

	return result
})

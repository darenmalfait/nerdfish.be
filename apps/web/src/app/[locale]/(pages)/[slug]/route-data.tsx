import { stripTrailingSlash } from '@repo/design-system/lib/utils/string'
import { type Locale } from '@repo/i18n/types'
import { notFound } from 'next/navigation'
import * as React from 'react'
import { getPage } from '../api'

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

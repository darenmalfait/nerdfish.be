import { notFound } from 'next/navigation'
import * as React from 'react'
import { getWork } from '~/app/[locale]/work/api'
import type { Locale } from '~/app/i18n/types'

export const getRouteData = React.cache(async function getRouteData(
	slug: string,
	locale?: Locale
) {
	const relativePath = `${locale ? `${locale}/` : ''}${decodeURIComponent(slug)}.mdx`

	const result = await getWork(relativePath)

	if (!result) return notFound()

	return result
})

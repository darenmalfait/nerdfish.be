import { type Locale } from '@repo/i18n/types'
import { notFound } from 'next/navigation'
import * as React from 'react'
import { work as workApi } from '~/app/[locale]/work/api'

export const getRouteData = React.cache(async function getRouteData(
	slug: string,
	locale?: Locale,
) {
	const work = await workApi.get({
		slug,
		locale,
	})

	if (!work) return notFound()

	return { work }
})

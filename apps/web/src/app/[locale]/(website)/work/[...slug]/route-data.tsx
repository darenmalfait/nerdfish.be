import { type Locale } from '@repo/i18n/types'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { work as workApi } from '../api'

export const getRouteData = cache(async function getRouteData(
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

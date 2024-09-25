import { stripPreSlash, stripTrailingSlash } from '@nerdfish-website/lib/utils'
import { type ogImageSchema } from '@nerdfish-website/lib/validations'
import { formatDate } from 'date-fns/format'
import { type Metadata } from 'next'
import { type z } from 'zod'

import { type SocialMetas } from './types'

export function getDomainUrl(): string | undefined {
	if (process.env.NEXT_PUBLIC_URL) {
		return process.env.NEXT_PUBLIC_URL
	}
}

export function generateOGImageUrl({
	...props
}: z.infer<typeof ogImageSchema>) {
	const url = getDomainUrl()
	const ogUrl = new URL(`${url}/api/og`)

	for (const [key, value] of Object.entries(props)) {
		ogUrl.searchParams.set(key, value)
	}

	return ogUrl.toString()
}

export function getMetaData({
	url: path,
	ogImage,
	title,
	description,
	canonical,
	type,
	other,
}: SocialMetas): Metadata {
	const basePath = stripTrailingSlash(getDomainUrl() ?? '')

	const url = path.startsWith('http')
		? path
		: `${basePath}/${stripPreSlash(path)}`

	return {
		...other,
		metadataBase: new URL(basePath),
		icons: {
			icon: '/favicon.ico',
			apple: '/apple-touch-icon.png',
		},
		title,
		description,
		alternates: {
			canonical: canonical ?? url,
			...other?.alternates,
		},
		openGraph: {
			title,
			description,
			type: type ?? 'website',
			url,
			images: [
				{
					url: ogImage,
				},
			],
			...other?.openGraph,
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],

			...other?.twitter,
		},
	}
}

export function nonNullable<T>(value: T): value is NonNullable<T> {
	return value !== null && value !== undefined
}

export function getDatedSlug(date?: string, slug?: string) {
	if (!date) return slug

	const dateSegment = formatDate(new Date(date), 'yyyy/MM')
	return `/${dateSegment}/${slug ?? ''}/`
}

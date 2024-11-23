import { env } from '@nerdfish-website/env'
import { stripPreSlash, stripTrailingSlash } from '@nerdfish-website/lib/utils'
import { type Metadata } from 'next'
import { type OpenGraphType } from 'next/dist/lib/metadata/types/opengraph-types'
import { type z } from 'zod'
import { type ogImageSchema } from '../api/og/validation'

export function getDomainUrl(): string | undefined {
	return env.NEXT_PUBLIC_URL
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
}: {
	canonical?: string | null
	description: string
	ogImage: string
	schema?: string
	title: string
	type?: OpenGraphType
	url: string
	other?: Metadata
}): Metadata {
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

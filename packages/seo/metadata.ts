import { env } from '@nerdfish-website/env'
import { stripPreSlash, stripTrailingSlash } from '@nerdfish-website/lib/utils'
import merge from 'lodash.merge'
import { type Metadata } from 'next'
import { type Author } from 'next/dist/lib/metadata/types/metadata-types'
import { type OpenGraphType } from 'next/dist/lib/metadata/types/opengraph-types'
import { z } from 'zod'

const applicationName = 'Nerdfish'

export const author: Author = {
	name: 'Daren Malfait',
	url: 'https://www.nerdfish.be',
}
const publisher = 'Daren Malfait'
const twitterHandle = '@darenmalfait'

export function getDomainUrl(): string | undefined {
	return env.NEXT_PUBLIC_URL
}

export const ogImageSchema = z.object({
	heading: z.string(),
})

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
	title: titleProp,
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
	const title = `${titleProp} | ${applicationName}`

	const url = path.startsWith('http')
		? path
		: `${basePath}/${stripPreSlash(path)}`

	const metadata: Metadata = {
		title,
		description,
		applicationName,
		authors: [author],
		creator: author.name,
		publisher,
		metadataBase: new URL(basePath),
		icons: {
			icon: '/favicon.ico',
			apple: '/apple-touch-icon.png',
		},
		alternates: {
			canonical: canonical ?? url,
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
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			creator: twitterHandle,
			images: [ogImage],
		},
	}

	return merge(metadata, other)
}

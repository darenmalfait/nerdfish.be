import { keys as core } from '@repo/next-config/keys'
import merge from 'lodash.merge'
import { type Metadata } from 'next'
import { type Author } from 'next/dist/lib/metadata/types/metadata-types'

const applicationName = 'Nerdfish'

export const author: Author = {
	name: 'Daren Malfait',
	url: 'https://www.nerdfish.be',
}
const publisher = 'Daren Malfait'
const twitterHandle = '@darenmalfait'

export const createMetadata = ({
	title,
	description,
	image,
	locale,
	...properties
}: Omit<Metadata, 'description' | 'title'> & {
	title: string
	description: string
	image?: string
	locale: string
}): Metadata => {
	const parsedTitle = `${title} | ${applicationName}`
	const defaultMetadata: Metadata = {
		metadataBase: new URL(core().NEXT_PUBLIC_URL),
		title: parsedTitle,
		description,
		applicationName,
		authors: [author],
		creator: author.name,
		formatDetection: {
			telephone: false,
		},
		appleWebApp: {
			capable: true,
			statusBarStyle: 'default',
			title: parsedTitle,
		},
		openGraph: {
			title: parsedTitle,
			description,
			type: 'website',
			siteName: applicationName,
			locale,
		},
		publisher,
		twitter: {
			card: 'summary_large_image',
			creator: twitterHandle,
		},
	}

	const metadata: Metadata = merge(defaultMetadata, properties)

	if (image && metadata.openGraph) {
		metadata.openGraph.images = [
			{
				url: image,
				width: 1200,
				height: 630,
				alt: title,
			},
		]
	}

	return metadata
}

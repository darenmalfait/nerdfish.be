import { env } from '@repo/env'
import { pageParams } from '@repo/og-utils/zod-params'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { draftMode } from 'next/headers'
import { WikiContent } from '../components/wiki-content'
import { WikiPreview } from '../components/wiki-preview'
import { getWikiPath } from '../utils'
import { getRouteData } from './route-data'
import { i18n } from '~/app/i18n/config'

export async function generateMetadata({
	params,
}: {
	params: { slug: string[] }
}): Promise<Metadata | undefined> {
	const { data } = await getRouteData(params.slug.join('/'))
	const title = data.wiki.seo?.title ?? (data.wiki.title || 'Untitled')

	const canonical =
		data.wiki.seo?.canonical ??
		`${env.NEXT_PUBLIC_URL}${getWikiPath(data.wiki)}`

	return createMetadata({
		title,
		description: data.wiki.seo?.description ?? '',
		image: data.wiki.seo?.seoImg
			? data.wiki.seo.seoImg
			: `${env.NEXT_PUBLIC_URL}/api/og?${pageParams.toSearchString({
					heading: title,
				})}`,
		alternates: {
			canonical,
		},
		robots: {
			index: false,
			follow: false,
		},
		locale: i18n.defaultLocale,
	})
}

export default async function WikiPage({
	params,
}: {
	params: { slug: string[] }
}) {
	const routeData = await getRouteData(params.slug.join('/'))
	const { isEnabled: isPreview } = draftMode()

	if (isPreview) return <WikiPreview {...routeData} />
	return <WikiContent {...routeData} />
}

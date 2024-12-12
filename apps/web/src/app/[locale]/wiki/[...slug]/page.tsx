import { pageParams } from '@repo/og-utils/zod-params'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { draftMode } from 'next/headers'
import { WikiContent } from '../components/wiki-content'
import { WikiPreview } from '../components/wiki-preview'
import { getWikiPath } from '../utils'
import { getRouteData } from './route-data'
import { i18n } from '~/app/i18n/config'

export async function generateMetadata(props: {
	params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
	const params = await props.params
	const { data } = await getRouteData(params.slug.join('/'))
	const title = data.wiki.seo?.title ?? (data.wiki.title || 'Untitled')

	return createMetadata({
		title,
		description: data.wiki.seo?.description ?? '',
		image:
			data.wiki.seo?.seoImg ??
			`/api/og?${pageParams.toSearchString({
				heading: title,
			})}`,
		alternates: {
			canonical: data.wiki.seo?.canonical ?? getWikiPath(data.wiki),
		},
		robots: {
			index: false,
			follow: false,
		},
		locale: i18n.defaultLocale,
	})
}

export default async function WikiPage(props: {
	params: Promise<{ slug: string[] }>
}) {
	const params = await props.params
	const routeData = await getRouteData(params.slug.join('/'))
	const { isEnabled: isPreview } = await draftMode()

	if (isPreview) return <WikiPreview {...routeData} />
	return <WikiContent {...routeData} />
}

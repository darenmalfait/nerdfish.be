import { type Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getRouteData } from './route-data'
import { WikiContent } from '~/app/[locale]/wiki/components/wiki-content'
import { WikiPreview } from '~/app/[locale]/wiki/components/wiki-preview'
import { getWikiPath } from '~/app/[locale]/wiki/utils'
import { generateOGImageUrl, getMetaData } from '~/app/common'

export async function generateMetadata({
	params,
}: {
	params: { slug: string[] }
}): Promise<Metadata | undefined> {
	const { data } = await getRouteData(params.slug.join('/'))

	const title = data.wiki.seo?.title ?? (data.wiki.title || 'Untitled')

	return getMetaData({
		ogImage: data.wiki.seo?.seoImg
			? data.wiki.seo.seoImg
			: generateOGImageUrl({
					heading: title,
				}),
		title,
		url: getWikiPath(data.wiki),
		description: data.wiki.seo?.description ?? '',
		canonical: data.wiki.seo?.canonical,
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

import { type Metadata } from 'next'
import { draftMode } from 'next/headers'

import { getRouteData } from './route-data'
import { generateOGImageUrl, getDatedSlug, getMetaData } from '~/app/common'
import { WorkContent } from '~/app/work/components/work-content'
import { WorkPreview } from '~/app/work/components/work-preview'

export async function generateMetadata({
	params,
}: {
	params: { slug: string; category: string }
}): Promise<Metadata | undefined> {
	const { data } = await getRouteData(params.slug, params.category)

	const title = data.work.seo?.title ?? (data.work.title || 'Untitled')

	return getMetaData({
		ogImage: data.work.seo?.seoImg
			? data.work.seo.seoImg
			: generateOGImageUrl({
					heading: title,
				}),
		title,
		url: `/work/${getDatedSlug(data.work.date, params.slug)}`,
		description: data.work.seo?.description ?? '',
		canonical: data.work.seo?.canonical,
	})
}

export default async function WorkPage({
	params,
}: {
	params: { slug: string; category: string }
}) {
	const routeData = await getRouteData(params.slug, params.category)

	const { isEnabled: isPreview } = draftMode()

	if (isPreview) return <WorkPreview {...routeData} />
	return <WorkContent {...routeData} />
}

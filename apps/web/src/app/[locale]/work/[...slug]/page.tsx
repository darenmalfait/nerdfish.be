import { type Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getWorkPath } from '../utils'
import { getRouteData } from './route-data'
import { WorkContent } from '~/app/[locale]/work/components/work-content'
import { WorkPreview } from '~/app/[locale]/work/components/work-preview'
import { generateOGImageUrl, getMetaData } from '~/app/common'
import { type WithLocale } from '~/i18n-config'

export async function generateMetadata({
	params,
}: {
	params: WithLocale<{ slug: string[] }>
}): Promise<Metadata | undefined> {
	const { data } = await getRouteData(params.slug.join('/'))
	const title = data.work.seo?.title ?? (data.work.title || 'Untitled')

	return getMetaData({
		ogImage: data.work.seo?.seoImg
			? data.work.seo.seoImg
			: generateOGImageUrl({
					heading: title,
				}),
		title,
		url: getWorkPath(data.work),
		description: data.work.seo?.description ?? '',
		canonical: data.work.seo?.canonical,
	})
}

export default async function WorkPage({
	params,
}: {
	params: WithLocale<{ slug: string[] }>
}) {
	const routeData = await getRouteData(params.slug.join('/'))

	const { isEnabled: isPreview } = draftMode()

	if (isPreview) return <WorkPreview {...routeData} />
	return <WorkContent {...routeData} />
}

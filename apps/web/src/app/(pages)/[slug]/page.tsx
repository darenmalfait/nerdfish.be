import { type Metadata } from 'next'
import { draftMode } from 'next/headers'

import { getPages } from '../api'
import { PageContent } from '../components/page-content'
import { PagePreview } from '../components/page-preview'
import { getRouteData } from './route-data'
import { generateOGImageUrl, getMetaData } from '~/app/common'

export async function generateStaticParams() {
	return ((await getPages()) ?? []).map((page) => ({
		slug: page._sys?.filename ?? 'home',
	}))
}

export async function generateMetadata({
	params,
}: {
	params: { slug?: string }
}): Promise<Metadata | undefined> {
	const { data } = await getRouteData(params.slug ?? '')

	const title = data.page.seo?.title ?? (data.page.title || 'Untitled')

	return getMetaData({
		ogImage: data.page.seo?.seoImg
			? data.page.seo.seoImg
			: generateOGImageUrl({
					heading: title,
				}),
		title,
		url: params.slug ?? '/',
		description: data.page.seo?.description ?? '',
		canonical: data.page.seo?.canonical,
	})
}

export default async function Page({
	params: { slug },
}: {
	params: { slug?: string }
}) {
	const routeData = await getRouteData(slug ?? '')
	const { isEnabled: isPreview } = draftMode()

	if (isPreview) return <PagePreview {...routeData} />
	return <PageContent {...routeData} />
}

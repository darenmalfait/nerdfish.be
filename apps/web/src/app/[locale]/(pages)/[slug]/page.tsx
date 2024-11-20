import { type Metadata } from 'next'
import { draftMode } from 'next/headers'

import { getPages } from '../api'
import { PageContent } from '../components/page-content'
import { PagePreview } from '../components/page-preview'
import { getRouteData } from './route-data'
import { generateOGImageUrl, getMetaData } from '~/app/common'
import { i18n, type WithLocale } from '~/app/i18n'

export async function generateStaticParams() {
	return ((await getPages()) ?? []).map((page) => {
		const locale = page._sys?.relativePath.split('/')[0]

		return {
			slug: page._sys?.filename ?? 'home',
			lang: locale ?? i18n.defaultLocale,
		}
	})
}

export async function generateMetadata({
	params,
}: {
	params: WithLocale<{ slug?: string }>
}): Promise<Metadata | undefined> {
	const { data } = await getRouteData(params.slug ?? '', params.locale)
	const baseSlug = i18n.defaultLocale === params.locale ? '' : params.locale

	const title = data.page.seo?.title ?? (data.page.title || 'Untitled')

	return getMetaData({
		ogImage: data.page.seo?.seoImg
			? data.page.seo.seoImg
			: generateOGImageUrl({
					heading: title,
				}),
		title,
		url: params.slug ? `/${baseSlug}/${params.slug}` : `/${baseSlug}`,
		description: data.page.seo?.description ?? '',
		canonical: data.page.seo?.canonical,
	})
}

export default async function Page({
	params: { slug, locale },
}: {
	params: WithLocale<{ slug?: string }>
}) {
	const routeData = await getRouteData(slug ?? '', locale)
	const { isEnabled: isPreview } = draftMode()

	if (isPreview) return <PagePreview {...routeData} />
	return <PageContent locale={locale} {...routeData} />
}

import { env } from '@repo/env'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPages } from '../api'
import { PageContent } from '../components/page-content'
import { PagePreview } from '../components/page-preview'
import { getRouteData } from './route-data'
import { generateOGImageUrl } from '~/app/api/og/utils'
import { i18n } from '~/app/i18n/config'
import { type WithLocale } from '~/app/i18n/types'

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
	const title = data.page.seo?.title ?? data.page.title

	const canonicalPath =
		!params.slug || params.slug === '/'
			? `${env.NEXT_PUBLIC_URL}/${params.locale}`
			: `${env.NEXT_PUBLIC_URL}/${params.locale}/${params.slug}`

	const canonical = data.page.seo?.canonical ?? canonicalPath

	const ogImage = data.page.seo?.seoImg
		? data.page.seo.seoImg
		: generateOGImageUrl({
				heading: title,
			})

	return createMetadata({
		title,
		description: data.page.seo?.description ?? '',
		image: ogImage,
		alternates: {
			canonical,
		},
		locale: params.locale,
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

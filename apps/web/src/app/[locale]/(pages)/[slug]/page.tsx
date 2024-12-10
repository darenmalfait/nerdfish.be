import { env } from '@repo/env'
import { pageParams } from '@repo/og-utils/zod-params'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPages } from '../api'
import { PageContent } from '../components/page-content'
import { PagePreview } from '../components/page-preview'
import { getPagePath } from '../utils'
import { getRouteData } from './route-data'
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

	const canonical =
		data.page.seo?.canonical ??
		`${env.NEXT_PUBLIC_URL}${getPagePath(data.page)}`

	const ogImage = data.page.seo?.seoImg
		? data.page.seo.seoImg
		: `${env.NEXT_PUBLIC_URL}/api/og/page?${pageParams.toSearchString({
				heading: title,
			})}`

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

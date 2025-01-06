import { i18n } from '@repo/i18n/config'
import { type WithLocale } from '@repo/i18n/types'
import { pageParams } from '@repo/og-utils/zod-params'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPages } from '../api'
import { PageContent } from '../components/page-content'
import { PagePreview } from '../components/page-preview'
import { getPagePath } from '../utils'
import { getRouteData } from './route-data'

export async function generateStaticParams() {
	return ((await getPages()) ?? []).map((page) => {
		const locale = page._sys?.relativePath.split('/')[0]

		return {
			slug: page._sys?.filename ?? 'home',
			lang: locale ?? i18n.defaultLocale,
		}
	})
}

export async function generateMetadata(props: {
	params: Promise<WithLocale<{ slug?: string }>>
}): Promise<Metadata | undefined> {
	const params = await props.params
	const { data } = await getRouteData(params.slug ?? '', params.locale)
	const title = data.page.seo?.title ?? data.page.title

	return createMetadata({
		title,
		description: data.page.seo?.description ?? '',
		image:
			data.page.seo?.seoImg ??
			`/api/og?${pageParams.toSearchString({
				heading: title,
			})}`,
		alternates: {
			canonical: data.page.seo?.canonical ?? getPagePath(data.page),
		},
		locale: params.locale,
	})
}

export default async function Page(props: {
	params: Promise<WithLocale<{ slug?: string }>>
}) {
	const params = await props.params

	const { slug, locale } = params

	const routeData = await getRouteData(slug ?? '', locale)
	const { isEnabled: isPreview } = await draftMode()

	if (isPreview) return <PagePreview {...routeData} />
	return <PageContent locale={locale} {...routeData} />
}

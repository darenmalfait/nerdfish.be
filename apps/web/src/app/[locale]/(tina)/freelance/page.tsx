import { i18n } from '@repo/i18n/config'
import { type Locale, type WithLocale } from '@repo/i18n/types'
import { pageParams } from '@repo/og-utils/zod-params'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import * as React from 'react'
import { getPage } from '../api'
import { PageContent } from '../components/page-content'
import { getPagePath } from '../utils'

const filenameMap: {
	[key in Locale]: string
} = {
	en: 'freelance.mdx',
	nl: 'freelance.mdx',
}

const getRouteData = React.cache(async function getRouteData(lang?: Locale) {
	const filename = filenameMap[lang ?? i18n.defaultLocale]
	const result = await getPage(filename, lang)

	if (!result) return notFound()

	return result
})

type PageProps = {
	params: Promise<WithLocale>
}

export async function generateMetadata(
	props: PageProps,
): Promise<Metadata | undefined> {
	const { locale } = await props.params
	const { data } = await getRouteData(locale)
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
		locale,
	})
}

export default async function Page(props: PageProps) {
	const { locale } = await props.params
	const routeData = await getRouteData(locale)

	return <PageContent locale={locale} {...routeData} />
}

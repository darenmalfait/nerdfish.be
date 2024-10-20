import { type Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getRouteData } from './route-data'
import { getWikiPosts } from '~/app/[locale]/wiki'
import { WorkContent } from '~/app/[locale]/work/components/work-content'
import { WorkPreview } from '~/app/[locale]/work/components/work-preview'
import { generateOGImageUrl, getDatedSlug, getMetaData } from '~/app/common'
import { i18n } from '~/i18n-config'

export async function generateStaticParams() {
	return ((await getWikiPosts()) ?? []).map((post) => {
		const locale = i18n.defaultLocale

		return {
			category: post._sys?.relativePath.split('/')[1],
			slug: post._sys?.filename,
			locale,
		}
	})
}

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

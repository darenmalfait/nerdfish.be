import { type Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getRouteData } from './route-data'
import { getWikiPosts } from '~/app/[locale]/wiki/api'
import { WikiContent } from '~/app/[locale]/wiki/components/wiki-content'
import { WikiPreview } from '~/app/[locale]/wiki/components/wiki-preview'
import { generateOGImageUrl, getDatedSlug, getMetaData } from '~/app/common'
import { i18n } from '~/i18n-config'

export async function generateStaticParams() {
	return ((await getWikiPosts()) ?? []).map((post) => {
		const locale = i18n.defaultLocale
		const parts = getDatedSlug(post.date, post._sys?.filename)?.split('/')

		if (!parts) return null

		return {
			year: parts[1],
			month: parts[2],
			slug: parts[3],
			locale,
		}
	})
}

export async function generateMetadata({
	params,
}: {
	params: { slug: string; year: string; month: string }
}): Promise<Metadata | undefined> {
	const { data } = await getRouteData(params.slug, params.year, params.month)

	const title = data.wiki.seo?.title ?? (data.wiki.title || 'Untitled')

	return getMetaData({
		ogImage: data.wiki.seo?.seoImg
			? data.wiki.seo.seoImg
			: generateOGImageUrl({
					heading: title,
				}),
		title,
		url: `/wiki/${getDatedSlug(data.wiki.date, params.slug)}`,
		description: data.wiki.seo?.description ?? '',
		canonical: data.wiki.seo?.canonical,
	})
}

export default async function WikiPage({
	params,
}: {
	params: { slug: string; year: string; month: string }
}) {
	const routeData = await getRouteData(params.slug, params.year, params.month)
	const { isEnabled: isPreview } = draftMode()

	if (isPreview) return <WikiPreview {...routeData} />
	return <WikiContent {...routeData} />
}

import { type Metadata } from 'next'
import { draftMode } from 'next/headers'

import { getRouteData } from './route-data'
import { getBlogPosts } from '~/app/[locale]/blog/api'
import { BlogContent } from '~/app/[locale]/blog/components/blog-content'
import { BlogPreview } from '~/app/[locale]/blog/components/blog-preview'
import { generateOGImageUrl, getDatedSlug, getMetaData } from '~/app/common'
import { i18n } from '~/i18n-config'

export async function generateStaticParams() {
	return ((await getBlogPosts()) ?? []).map((post) => {
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

	const title = data.blog.seo?.title ?? (data.blog.title || 'Untitled')

	return getMetaData({
		ogImage: data.blog.seo?.seoImg
			? data.blog.seo.seoImg
			: generateOGImageUrl({
					heading: title,
				}),
		title,
		url: `/blog/${getDatedSlug(data.blog.date, params.slug)}`,
		description: data.blog.seo?.description ?? '',
		canonical: data.blog.seo?.canonical,
	})
}

export default async function BlogPage({
	params,
}: {
	params: { slug: string; year: string; month: string }
}) {
	const routeData = await getRouteData(params.slug, params.year, params.month)

	const { isEnabled: isPreview } = draftMode()

	if (isPreview) return <BlogPreview {...routeData} />
	return <BlogContent {...routeData} />
}

import { type Metadata } from 'next'
import { draftMode } from 'next/headers'

import { getRouteData } from './route-data'
import { BlogContent } from '~/app/blog/components/blog-content'
import { BlogPreview } from '~/app/blog/components/blog-preview'
import { generateOGImageUrl, getDatedSlug, getMetaData } from '~/app/common'

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

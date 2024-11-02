import { type Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getRouteData } from './route-data'
import { BlogContent } from '~/app/[locale]/blog/components/blog-content'
import { BlogPreview } from '~/app/[locale]/blog/components/blog-preview'
import { generateOGImageUrl, getMetaData } from '~/app/common'
import { type WithLocale } from '~/app/i18n'

export async function generateMetadata({
	params,
}: {
	params: WithLocale<{ slug: string[] }>
}): Promise<Metadata | undefined> {
	const { data } = await getRouteData(params.slug.join('/'))

	const title = data.blog.seo?.title ?? (data.blog.title || 'Untitled')

	return getMetaData({
		ogImage: data.blog.seo?.seoImg
			? data.blog.seo.seoImg
			: generateOGImageUrl({
					heading: title,
				}),
		title,
		url: `/blog/${params.slug.join('/')}`,
		description: data.blog.seo?.description ?? '',
		canonical: data.blog.seo?.canonical,
	})
}

export default async function BlogPage({
	params,
}: {
	params: WithLocale<{ slug: string[] }>
}) {
	const routeData = await getRouteData(params.slug.join('/'))

	const { isEnabled: isPreview } = draftMode()

	if (isPreview) return <BlogPreview {...routeData} />
	return <BlogContent {...routeData} />
}

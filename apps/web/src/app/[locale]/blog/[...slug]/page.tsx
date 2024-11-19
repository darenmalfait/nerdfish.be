import { type Metadata } from 'next'
import { draftMode } from 'next/headers'
import { BlogOverviewBlock } from '../blocks'
import { getBlogPath } from '../utils'
import { getRouteData } from './route-data'
import { BlogContent } from '~/app/[locale]/blog/components/blog-content'
import { BlogPreview } from '~/app/[locale]/blog/components/blog-preview'
import { generateOGImageUrl, getMetaData } from '~/app/common'
import { type WithLocale } from '~/app/i18n'
import { getDictionary } from '~/app/i18n/get-dictionary'

export async function generateMetadata({
	params,
}: {
	params: WithLocale<{ slug: string[] }>
}): Promise<Metadata | undefined> {
	const { data } = await getRouteData(params.slug.join('/'), params.locale)
	const title = data.blog.seo?.title ?? (data.blog.title || 'Untitled')

	return getMetaData({
		ogImage: data.blog.seo?.seoImg
			? data.blog.seo.seoImg
			: generateOGImageUrl({
					heading: title,
				}),
		title,
		url: getBlogPath(data.blog),
		description: data.blog.seo?.description ?? '',
		canonical: data.blog.seo?.canonical,
	})
}

export default async function BlogPage({
	params,
}: {
	params: WithLocale<{ slug: string[] }>
}) {
	const t = await getDictionary(params.locale)
	const routeData = await getRouteData(params.slug.join('/'), params.locale)

	const { isEnabled: isPreview } = draftMode()

	if (isPreview) return <BlogPreview {...routeData} />
	return (
		<BlogContent
			relatedContent={
				<BlogOverviewBlock
					header={{
						title: t['work.related.title'],
						subtitle: t['work.related.subtitle'],
					}}
					count={2}
					locale={params.locale}
					relatedTo={routeData.data.blog}
				/>
			}
			{...routeData}
		/>
	)
}

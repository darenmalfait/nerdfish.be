import { createMetadata } from '@repo/seo/metadata'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { generateOGImageUrl } from '~/app/api/og'
import type { WithLocale } from '~/app/i18n'
import { getDictionary } from '~/app/i18n/get-dictionary'
import { BlogOverviewBlock } from '../blocks'
import { BlogContent } from '../components/blog-content'
import { BlogPreview } from '../components/blog-preview'
import { getRouteData } from './route-data'

export async function generateMetadata({
	params,
}: {
	params: WithLocale<{ slug: string[] }>
}): Promise<Metadata | undefined> {
	const { data } = await getRouteData(params.slug.join('/'), params.locale)
	const title = data.blog.seo?.title ?? (data.blog.title || 'Untitled')

	return createMetadata({
		title,
		description: data.blog.seo?.description ?? '',
		image: data.blog.seo?.seoImg
			? data.blog.seo.seoImg
			: generateOGImageUrl({
					heading: title,
				}),
		alternates: {
			canonical: data.blog.seo?.canonical,
		},
		locale: params.locale,
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

	if (isPreview) return <BlogPreview locale={params.locale} {...routeData} />
	return (
		<BlogContent
			locale={params.locale}
			relatedContent={
				<BlogOverviewBlock
					header={{
						title: t['blog.related.title'],
						subtitle: t['blog.related.subtitle'],
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

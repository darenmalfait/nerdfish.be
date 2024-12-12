import { pageParams } from '@repo/og-utils/zod-params'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getTranslations } from 'next-intl/server'
import { BlogOverviewBlock } from '../blocks/blog-overview'
import { BlogContent } from '../components/blog-content'
import { BlogPreview } from '../components/blog-preview'
import { getBlogPath } from '../utils'
import { getRouteData } from './route-data'
import { type WithLocale } from '~/app/i18n/types'

export async function generateMetadata(props: {
	params: Promise<WithLocale<{ slug: string[] }>>
}): Promise<Metadata | undefined> {
	const params = await props.params
	const { data } = await getRouteData(params.slug.join('/'), params.locale)
	const title = data.blog.seo?.title ?? (data.blog.title || 'Untitled')

	return createMetadata({
		title,
		description: data.blog.seo?.description ?? '',
		image:
			data.blog.seo?.seoImg ??
			`/api/og?${pageParams.toSearchString({
				heading: title,
			})}`,
		alternates: {
			canonical: data.blog.seo?.canonical ?? getBlogPath(data.blog),
		},
		locale: params.locale,
	})
}

export default async function BlogPage(props: {
	params: Promise<WithLocale<{ slug: string[] }>>
}) {
	const params = await props.params
	const t = await getTranslations('blog')
	const routeData = await getRouteData(params.slug.join('/'), params.locale)

	const { isEnabled: isPreview } = await draftMode()

	if (isPreview) return <BlogPreview locale={params.locale} {...routeData} />
	return (
		<BlogContent
			locale={params.locale}
			relatedContent={
				<BlogOverviewBlock
					header={{
						title: t('related.title'),
						subtitle: t('related.subtitle'),
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

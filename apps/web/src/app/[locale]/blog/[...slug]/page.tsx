import { env } from '@repo/env'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getTranslations } from 'next-intl/server'
import { BlogOverviewBlock } from '../blocks/blog-overview'
import { BlogContent } from '../components/blog-content'
import { BlogPreview } from '../components/blog-preview'
import { getRouteData } from './route-data'
import { generateOGImageUrl } from '~/app/api/og/utils'
import { i18n } from '~/app/i18n/config'
import { type WithLocale } from '~/app/i18n/types'

export async function generateMetadata({
	params,
}: {
	params: WithLocale<{ slug: string[] }>
}): Promise<Metadata | undefined> {
	const { data } = await getRouteData(params.slug.join('/'), params.locale)
	const title = data.blog.seo?.title ?? (data.blog.title || 'Untitled')

	const prefix = params.locale === i18n.defaultLocale ? '' : `/${params.locale}`

	const canonical =
		data.blog.seo?.canonical ??
		`${env.NEXT_PUBLIC_URL}${prefix}/${params.slug.join('/')}`

	return createMetadata({
		title,
		description: data.blog.seo?.description ?? '',
		image: data.blog.seo?.seoImg
			? data.blog.seo.seoImg
			: generateOGImageUrl({
					heading: title,
				}),
		alternates: {
			canonical,
		},
		locale: params.locale,
	})
}

export default async function BlogPage({
	params,
}: {
	params: WithLocale<{ slug: string[] }>
}) {
	const t = await getTranslations('blog')
	const routeData = await getRouteData(params.slug.join('/'), params.locale)

	const { isEnabled: isPreview } = draftMode()

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

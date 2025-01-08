import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/design-system/components/section'
import { getTranslations } from '@repo/i18n/server'
import { type WithLocale } from '@repo/i18n/types'
import { blogParams } from '@repo/og-utils/zod-params'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { BlogContent } from '../components/blog-content'
import { BlogOverview } from '../components/blog-overview'
import { getBlogPath } from '../utils'
import { getRouteData } from './route-data'

export async function generateMetadata(props: {
	params: Promise<WithLocale<{ slug: string[] }>>
}): Promise<Metadata | undefined> {
	const params = await props.params
	const { post } = await getRouteData(params.slug.join('/'), params.locale)
	const title = post.seo.title

	return createMetadata({
		title,
		description: post.seo.description,
		image:
			post.seo.image ??
			`/api/og/blog?${blogParams.toSearchString({
				title,
				image: post.heroImg.src,
			})}`,
		alternates: {
			canonical: post.seo.canonical ?? getBlogPath(post),
		},
		locale: params.locale,
	})
}

export default async function BlogPage(props: {
	params: Promise<WithLocale<{ slug: string[] }>>
}) {
	const params = await props.params
	const t = await getTranslations('blog')
	const { post } = await getRouteData(params.slug.join('/'), params.locale)

	return (
		<BlogContent
			relatedContent={
				<Section>
					<SectionHeader>
						<SectionHeaderTitle>{t('related.title')}</SectionHeaderTitle>
						<SectionHeaderSubtitle>
							{t('related.subtitle')}
						</SectionHeaderSubtitle>
					</SectionHeader>

					<BlogOverview count={2} relatedTo={post} />
				</Section>
			}
			data={post}
			locale={params.locale}
		/>
	)
}

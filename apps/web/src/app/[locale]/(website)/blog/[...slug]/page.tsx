import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/design-system/components/section'
import { getTranslations } from '@repo/i18n/server'
import { type Locale, type WithLocale } from '@repo/i18n/types'
import { blogParams } from '@repo/og-utils/zod-params'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { blog } from '../api'
import { BlogContent } from '../components/blog-content'
import { BlogOverview } from '../components/blog-overview'
import { getBlogPath } from '../utils'

type PageProps = {
	params: Promise<WithLocale<{ slug: string[] }>>
}

const getPageData = cache(async function getPageData(
	slug: string,
	locale?: Locale,
) {
	const post = await blog.get({ slug: decodeURIComponent(slug), locale })

	if (!post) return notFound()

	return {
		post,
	}
})

export async function generateMetadata(
	props: PageProps,
): Promise<Metadata | undefined> {
	const { slug, locale } = await props.params
	const { post } = await getPageData(slug.join('/'), locale)
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
		locale,
	})
}

export default async function BlogDetailPage(props: PageProps) {
	const { slug, locale } = await props.params
	const t = await getTranslations('blog.content')
	const { post } = await getPageData(slug.join('/'), locale)

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
			locale={locale}
		/>
	)
}

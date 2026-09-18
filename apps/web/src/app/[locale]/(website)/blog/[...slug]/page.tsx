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
import { type Post } from 'content-collections'
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache, Suspense } from 'react'
import { blog } from '~/features/blog/api'
import { BlogContent } from '~/features/blog/components/blog-content'
import { BlogOverview } from '~/features/blog/components/blog-overview'
import { getBlogPath } from '~/features/blog/utils'

type PageProps = {
	params: Promise<WithLocale<{ slug: string[] }>>
}

const getPageData = cache(async function fetchPageData(
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

async function RelatedPosts({ post }: { post: Post }) {
	const t = await getTranslations('blog.content')

	return (
		<Section>
			<SectionHeader>
				<SectionHeaderTitle>{t('related.title')}</SectionHeaderTitle>
				<SectionHeaderSubtitle>{t('related.subtitle')}</SectionHeaderSubtitle>
			</SectionHeader>

			<BlogOverview count={2} relatedTo={post} />
		</Section>
	)
}

export default async function BlogDetailPage(props: PageProps) {
	const { slug, locale } = await props.params
	const { post } = await getPageData(slug.join('/'), locale)

	return (
		<BlogContent
			relatedContent={
				<Suspense fallback={null}>
					<RelatedPosts post={post} />
				</Suspense>
			}
			data={post}
			locale={locale}
		/>
	)
}

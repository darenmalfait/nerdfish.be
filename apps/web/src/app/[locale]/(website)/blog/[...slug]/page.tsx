import { type WithLocale } from '@repo/i18n/types'
import { blogParams } from '@repo/og-utils/zod-params'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogDetailPage, blog, getBlogPath } from '~/features/blog'

type PageProps = {
	params: Promise<WithLocale<{ slug: string[] }>>
}

export async function generateMetadata(
	props: PageProps,
): Promise<Metadata | undefined> {
	const { slug, locale } = await props.params
	const post = await blog.get({
		slug: decodeURIComponent(slug.join('/')),
		locale,
	})

	if (!post) return notFound()

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

export default BlogDetailPage

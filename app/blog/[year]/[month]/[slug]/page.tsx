import type {Metadata} from 'next'
import {padStart} from 'lodash'

import {getBlogPost, getBlogPosts} from '~/lib/services/api'
import {getMetaData} from '~/lib/utils/seo'
import {getFileNameFromUrl} from '~/lib/utils/social'
import {BlogPage} from '~/templates/blog'

function getPath(slug?: string, year?: string, month?: string) {
  let path = `${slug}.mdx`

  if (year && month) {
    path = `${year}/${month}/${path}`
  }

  return path
}

async function fetchBlog(slug?: string, year?: string, month?: string) {
  return getBlogPost(getPath(slug, year, month))
}

export async function generateStaticPaths() {
  return ((await getBlogPosts()) ?? []).map(({date, _sys}) => {
    const d = new Date(date ?? '')

    return {
      year: d.getFullYear().toString(),
      month: padStart((d.getMonth() + 1).toString(), 2, '0'),
      slug: _sys?.filename,
    }
  })
}

export async function generateMetadata({
  params,
}: {
  params: {slug?: string; year?: string; month?: string}
}): Promise<Metadata | undefined> {
  const {data} = await fetchBlog(params.slug, params.year, params.month)

  return getMetaData({
    image: data.blog.seo?.seoImg,
    subImage: data.blog.seo?.partialSeoImage
      ? getFileNameFromUrl(data.blog.seo.partialSeoImage)
      : undefined,
    title: data.blog.seo?.title ?? (data.blog.title || 'Untitled'),
    url: params.slug ?? '/',
    description: data.blog.seo?.description ?? '',
    canonical: data.blog.seo?.canonical,
    cardType: data.blog.seo?.cardType,
  })
}

export default async function Page({
  params: {slug, year, month},
}: {
  params: {slug?: string; year?: string; month?: string}
}) {
  const data = await fetchBlog(slug, year, month)

  return <BlogPage {...data} />
}

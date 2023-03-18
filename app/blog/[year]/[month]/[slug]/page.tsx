import {type Metadata} from 'next'
import {notFound} from 'next/navigation'
import {padStart} from 'lodash'

import {getBlogPost, getBlogPosts} from '~/lib/services/api'
import {buildSrc} from '~/lib/utils/cloudinary'
import {getMetaData} from '~/lib/utils/seo'
import {generateOGImageUrl, getFileNameFromUrl} from '~/lib/utils/social'
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

export async function generateStaticParams() {
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
  const loaderData = await fetchBlog(params.slug, params.year, params.month)

  if (!loaderData) {
    return
  }

  const {data} = loaderData

  const title = data.blog.seo?.title ?? (data.blog.title || 'Untitled')

  return getMetaData({
    ogImage: data.blog.seo?.seoImg
      ? data.blog.seo.seoImg
      : generateOGImageUrl({
          cardType: data.blog.seo?.cardType as any,
          image:
            data.blog.seo?.partialSeoImage || data.blog.heroImg
              ? buildSrc(
                  getFileNameFromUrl(
                    data.blog.seo?.partialSeoImage ?? data.blog.heroImg,
                  ) ?? '',
                  {
                    width: data.blog.seo?.cardType === 'secondary' ? 1100 : 800,
                    height: data.blog.seo?.cardType === 'secondary' ? 430 : 630,
                    format: 'png',
                  },
                )
              : undefined,
          heading: title,
        }),
    title,
    url: params.slug ?? '/',
    description: data.blog.seo?.description ?? '',
    canonical: data.blog.seo?.canonical,
  })
}

export default async function Page({
  params: {slug, year, month},
}: {
  params: {slug?: string; year?: string; month?: string}
}) {
  const loaderData = await fetchBlog(slug, year, month)

  if (!loaderData) {
    notFound()
  }

  return <BlogPage {...loaderData} />
}

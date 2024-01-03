import * as React from 'react'
import {type Metadata} from 'next'
import {draftMode} from 'next/headers'

import {buildSrc, getFileNameFromUrl} from '~/lib/utils/cloudinary'
import {getDatedSlug} from '~/lib/utils/routes'
import {getMetaData} from '~/lib/utils/seo'
import {generateOGImageUrl} from '~/lib/utils/social'

import {BlogContent} from './_components/blog-content'
import {BlogPreview} from './_components/blog-preview'
import {getRouteData} from './route-data'

export async function generateMetadata({
  params,
}: {
  params: {slug: string; year: string; month: string}
}): Promise<Metadata | undefined> {
  const {data} = await getRouteData(params.slug, params.year, params.month)

  const title = data.blog.seo?.title ?? (data.blog.title || 'Untitled')

  return getMetaData({
    ogImage: data.blog.seo?.seoImg
      ? data.blog.seo.seoImg
      : generateOGImageUrl({
          cardType: data.blog.seo?.cardType as any,
          image:
            data.blog.seo?.partialSeoImage ?? data.blog.heroImg
              ? buildSrc(
                  getFileNameFromUrl(
                    data.blog.seo?.partialSeoImage ?? data.blog.heroImg ?? '',
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
    url: `/blog/${getDatedSlug(data.blog.date, params.slug)}`,
    description: data.blog.seo?.description ?? '',
    canonical: data.blog.seo?.canonical,
  })
}

export default async function BlogPage({
  params,
}: {
  params: {slug: string; year: string; month: string}
}) {
  const routeData = await getRouteData(params.slug, params.year, params.month)

  const {isEnabled: isPreview} = draftMode()

  if (isPreview) {
    return <BlogPreview {...routeData} />
  }

  return <BlogContent {...routeData} />
}

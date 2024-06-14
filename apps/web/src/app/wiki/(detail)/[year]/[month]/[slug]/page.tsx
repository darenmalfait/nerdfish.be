import * as React from 'react'
import {type Metadata} from 'next'
import {draftMode} from 'next/headers'

import {generateOGImageUrl, getDatedSlug, getMetaData} from '~/app/common'
import {WikiContent} from '~/app/wiki/components/wiki-content'
import {WikiPreview} from '~/app/wiki/components/wiki-preview'

import {getRouteData} from './route-data'

export async function generateMetadata({
  params,
}: {
  params: {slug: string; year: string; month: string}
}): Promise<Metadata | undefined> {
  const {data} = await getRouteData(params.slug, params.year, params.month)

  const title = data.wiki.seo?.title ?? (data.wiki.title || 'Untitled')

  return getMetaData({
    ogImage: data.wiki.seo?.seoImg
      ? data.wiki.seo.seoImg
      : generateOGImageUrl({
          cardType: data.wiki.seo?.cardType,
          image: data.wiki.seo?.partialSeoImage,
          heading: title,
        }),
    title,
    url: `/wiki/${getDatedSlug(data.wiki.date, params.slug)}`,
    description: data.wiki.seo?.description ?? '',
    canonical: data.wiki.seo?.canonical,
  })
}

export default async function WikiPage({
  params,
}: {
  params: {slug: string; year: string; month: string}
}) {
  const routeData = await getRouteData(params.slug, params.year, params.month)
  const {isEnabled: isPreview} = draftMode()

  if (isPreview) return <WikiPreview {...routeData} />
  return <WikiContent {...routeData} />
}

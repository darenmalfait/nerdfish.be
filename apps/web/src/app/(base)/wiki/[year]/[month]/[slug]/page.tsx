import * as React from 'react'
import {type Metadata} from 'next'
import {draftMode} from 'next/headers'

import {buildSrc, getFileNameFromUrl} from '~/lib/utils/cloudinary'
import {getDatedSlug} from '~/lib/utils/routes'
import {getMetaData} from '~/lib/utils/seo'
import {generateOGImageUrl} from '~/lib/utils/social'

import {WikiContent} from './_components/wiki-content'
import {WikiPreview} from './_components/wiki-preview'
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
          image: data.wiki.seo?.partialSeoImage
            ? buildSrc(
                getFileNameFromUrl(data.wiki.seo.partialSeoImage) ?? '',
                {
                  width: data.wiki.seo.cardType === 'secondary' ? 1100 : 800,
                  height: data.wiki.seo.cardType === 'secondary' ? 430 : 630,
                  format: 'png',
                },
              )
            : undefined,
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

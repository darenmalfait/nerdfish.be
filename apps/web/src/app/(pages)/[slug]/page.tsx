import * as React from 'react'
import {type Metadata} from 'next'
import {draftMode} from 'next/headers'

import {generateOGImageUrl, getMetaData} from '~/app/common'

import {getPages} from '../api'
import {PageContent} from '../components/page-content'
import {PagePreview} from '../components/page-preview'
import {getRouteData} from './route-data'

export async function generateStaticParams() {
  return ((await getPages()) ?? []).map(page => ({
    slug: page._sys?.filename ?? 'home',
  }))
}

export async function generateMetadata({
  params,
}: {
  params: {slug?: string}
}): Promise<Metadata | undefined> {
  const {data} = await getRouteData(params.slug ?? '')

  const title = data.page.seo?.title ?? (data.page.title || 'Untitled')

  return getMetaData({
    ogImage: data.page.seo?.seoImg
      ? data.page.seo.seoImg
      : generateOGImageUrl({
          cardType: data.page.seo?.cardType,
          image: data.page.seo?.partialSeoImage,
          heading: title,
        }),
    title,
    url: params.slug ?? '/',
    description: data.page.seo?.description ?? '',
    canonical: data.page.seo?.canonical,
  })
}

export default async function Page({
  params: {slug},
}: {
  params: {slug?: string}
}) {
  const routeData = await getRouteData(slug ?? '')
  const {isEnabled: isPreview} = draftMode()

  if (isPreview) return <PagePreview {...routeData} />
  return <PageContent {...routeData} />
}

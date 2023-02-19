import type {Metadata} from 'next'

import {getPage, getPages} from '~/lib/services/api'
import {getMetaData} from '~/lib/utils/seo'
import {getFileNameFromUrl} from '~/lib/utils/social'
import {DefaultPage} from '~/templates/page'

async function fetchPage(slug?: string) {
  return getPage(`${slug?.toLowerCase() ?? 'home'}.md`)
}

export async function generateStaticPaths() {
  return ((await getPages()) ?? []).map(page => ({
    slug: page._sys?.filename ?? 'home',
  }))
}

export async function generateMetadata({
  params,
}: {
  params: {slug?: string}
}): Promise<Metadata | undefined> {
  const {data} = await fetchPage(params.slug)

  return getMetaData({
    image: data.page.seo?.seoImg,
    subImage: data.page.seo?.partialSeoImage
      ? getFileNameFromUrl(data.page.seo.partialSeoImage)
      : undefined,
    title: data.page.seo?.title ?? (data.page.title || 'Untitled'),
    url: params.slug ?? '/',
    description: data.page.seo?.description ?? '',
    canonical: data.page.seo?.canonical,
    cardType: data.page.seo?.cardType,
  })
}

export default async function Page({
  params: {slug},
}: {
  params: {slug?: string}
}) {
  const data = await fetchPage(slug)

  return <DefaultPage {...data} />
}

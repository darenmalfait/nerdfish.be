import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

import {getPage, getPages} from '~/lib/services/api'
import {getMetaData} from '~/lib/utils/seo'
import {getFileNameFromUrl} from '~/lib/utils/social'
import {stripTrailingSlash} from '~/lib/utils/string'
import {DefaultPage} from '~/templates/page'

async function fetchPage(slug?: string) {
  const path = slug ? stripTrailingSlash(slug.toLowerCase()) : 'home'
  return getPage(`${path.length ? path : 'home'}.md`)
}

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
  const loaderData = await fetchPage(params.slug)

  if (!loaderData) {
    return
  }

  const {data} = loaderData

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

  if (!data) {
    notFound()
  }

  return <DefaultPage {...data} />
}

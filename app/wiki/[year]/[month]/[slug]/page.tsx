import type {Metadata} from 'next'
import {padStart} from 'lodash'

import {getWikiPost, getWikiPosts} from '~/lib/services/api'
import {getMetaData} from '~/lib/utils/seo'
import {getFileNameFromUrl} from '~/lib/utils/social'
import {WikiPage} from '~/templates/wiki'

function getPath(slug?: string, year?: string, month?: string) {
  let path = `${slug}.mdx`

  if (year && month) {
    path = `${year}/${month}/${path}`
  }

  return path
}

async function fetchWiki(slug?: string, year?: string, month?: string) {
  return getWikiPost(getPath(slug, year, month))
}

export async function generateStaticPaths() {
  return ((await getWikiPosts()) ?? []).map(({date, _sys}) => {
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
  const {data} = await fetchWiki(params.slug, params.year, params.month)

  return getMetaData({
    image: data.wiki.seo?.seoImg,
    subImage: data.wiki.seo?.partialSeoImage
      ? getFileNameFromUrl(data.wiki.seo.partialSeoImage)
      : undefined,
    title: data.wiki.seo?.title ?? (data.wiki.title || 'Untitled'),
    url: params.slug ?? '/',
    description: data.wiki.seo?.description ?? '',
    canonical: data.wiki.seo?.canonical,
    cardType: data.wiki.seo?.cardType,
  })
}

export default async function wikiPage({
  params: {slug, year, month},
}: {
  params: {slug?: string; year?: string; month?: string}
}) {
  const data = await fetchWiki(slug, year, month)

  return <WikiPage {...data} />
}

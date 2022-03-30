import type { HtmlMetaDescriptor } from 'remix'

import { removeTrailingSlash } from './string'

import { urlFor } from '~/lib/api/sanity'
import type { LoaderData as RootLoaderData } from '~/route-containers/layout/layout.server'

import type { SanityPage, SanityPost } from '~/types'

export function getSocialMetas({
  url,
  title,
  description,
  image,
  keywords = '',
}: {
  image?: string | null
  url: string
  title: string
  description: string
  keywords?: string
}) {
  // TODO add default seo meta image
  const imageMeta = image
    ? {
        image,
        'og:image': image,
        'twitter:image': image,
      }
    : null

  return {
    title,
    description,
    keywords,
    'og:url': url,
    'og:title': title,
    'og:description': description,
    'twitter:card': image ? 'summary_large_image' : 'summary',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:alt': title,
    ...imageMeta,
  }
}

function pageMeta({
  data,
  parentsData,
}: {
  data: { data: SanityPage | null } | null
  parentsData: { root: RootLoaderData }
}): HtmlMetaDescriptor {
  const { requestInfo, siteInfo } = parentsData.root
  const page = data?.data

  const url = removeTrailingSlash(`${requestInfo.origin}${requestInfo.path}`)

  const title = page?.seo?.title || siteInfo?.site?.seo?.title || ''
  const description =
    page?.seo?.description || siteInfo?.site?.seo?.description || ''

  const image = page?.seo?.image
    ? urlFor(page.seo.image).width(1200).height(630).url()
    : null

  return {
    ...getSocialMetas({ url, title, description, image }),
  }
}

function blogMeta({
  data,
  parentsData,
}: {
  data: { data: SanityPost | null } | null
  parentsData: { root: RootLoaderData }
}): HtmlMetaDescriptor {
  const { requestInfo, siteInfo } = parentsData.root
  const post = data?.data

  const url = removeTrailingSlash(`${requestInfo.origin}${requestInfo.path}`)

  const title =
    post?.seo?.title || post?.title || siteInfo?.site?.seo?.title || ''
  const description =
    post?.seo?.description ||
    post?.excerpt ||
    siteInfo?.site?.seo?.description ||
    ''
  const keywords = post?.tags?.map(tag => tag.value).join(', ') || ''

  const image = post?.seo?.image
    ? urlFor(post.seo.image).width(1200).height(630).url()
    : null

  return {
    ...getSocialMetas({ url, title, keywords, description, image }),
  }
}

export { pageMeta, blogMeta }

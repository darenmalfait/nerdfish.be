import { getClient, groq } from './sanity'
import { getDoc, getDocByType, getSiteConfig, pageData } from './sanity/queries'

import type { LanguageCode } from '~/types'
import { PageType } from '~/types/languages'
import type { DefaultPageProps } from '~/types/misc'
import type {
  SanityPage,
  SanityPost,
  SiteConfig,
  SiteInfo,
  SiteNavigation,
} from '~/types/sanity'
import { getDefaultLanguage } from '~/utils/i18n'

export interface PageProps extends DefaultPageProps<SiteInfo> {
  page: SanityPage
}

export async function getAllPages(): Promise<SanityPage[]> {
  const query = groq`{
    ${getDocByType(PageType.page, 'pages')} { ${pageData} },
    ${getSiteConfig()}
  }`

  const defaultLanguage = getDefaultLanguage().code

  const {
    siteConfig,
    pages,
  }: {
    siteConfig: { site: SiteConfig }
    pages: SanityPage[]
  } = await getClient().fetch(query, { lang: defaultLanguage })

  let filteredPages: SanityPage[] = pages

  if (!siteConfig.site.multilang) {
    filteredPages = pages.filter(({ lang }: any) => lang === defaultLanguage)
  }

  return filteredPages
}

export async function getSiteInfo({
  lang = getDefaultLanguage().code,
}: {
  lang?: LanguageCode
}): Promise<SiteInfo> {
  const query = groq`{
    ${getSiteConfig()}
  }`

  const {
    siteConfig,
  }: {
    siteConfig: SiteInfo
  } = await getClient().fetch(query, { lang })

  return siteConfig
}

export async function getPage({
  slug,
  preview,
  lang = getDefaultLanguage().code,
}: {
  slug: string
  lang?: LanguageCode
  preview?: boolean
}): Promise<PageProps> {
  const query = groq`{
    ${`"${PageType.page}":${getDoc(PageType.page, true)}`},
    ${getSiteConfig()}
  }`

  const data: PageProps = await getClient(preview).fetch(query, { lang, slug })

  return {
    ...data,
  }
}

export interface BlogPageProps
  extends DefaultPageProps<{
    site?: SiteConfig
    navigation?: SiteNavigation
  }> {
  post: SanityPost
}

export async function getBlogPost({
  slug,
  preview,
  lang = getDefaultLanguage().code,
}: {
  slug: string
  lang?: LanguageCode
  preview?: boolean
}): Promise<BlogPageProps> {
  const query = groq`{
    ${`"${PageType.blog}":${getDoc(PageType.blog, true)}`},
    ${getSiteConfig()}
  }`

  const data: BlogPageProps = await getClient(preview).fetch(query, {
    lang,
    slug,
  })

  return {
    ...data,
  }
}

export async function getAllPosts(): Promise<SanityPost[]> {
  const query = groq`{
     ${getDocByType(
       PageType.blog,
       'posts',
     )} | order(publishedAt desc)  { "slug": slug.current, publishedAt, "lang": i18n_lang, title, publishedAt, excerpt },
    ${getSiteConfig()}
  }`

  const defaultLanguage = getDefaultLanguage().code

  const {
    siteConfig,
    posts,
  }: {
    siteConfig: { site: SiteConfig }
    posts: SanityPost[]
  } = await getClient().fetch(query, { lang: defaultLanguage })

  let filteredPosts: SanityPost[] = posts

  if (!siteConfig.site.multilang) {
    filteredPosts = posts.filter(({ lang }: any) => lang === defaultLanguage)
  }

  return filteredPosts
}

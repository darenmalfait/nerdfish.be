import { getClient, groq } from './sanity'
import { getDoc, getDocByType, getSiteConfig, pageData } from './sanity/queries'

import { getDefaultLanguage } from '~/lib/utils/i18n'
import { PageType } from '~/types/languages'
import type { DefaultDocumentProps } from '~/types/misc'
import type {
  SanityPage,
  SanityPost,
  SiteConfig,
  SiteInfo,
  SiteNavigation,
} from '~/types/sanity'

interface DocumentProps extends DefaultDocumentProps<SiteInfo> {
  page?: SanityPage
}

async function getAllPages(): Promise<SanityPage[]> {
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

async function getSiteInfo({
  lang = getDefaultLanguage().code,
}: {
  lang?: string
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

async function getPage({
  slug,
  preview,
  lang = getDefaultLanguage().code,
}: {
  slug: string
  lang?: string
  preview?: boolean
}): Promise<DocumentProps> {
  const query = groq`{
    ${`"${PageType.page}":${getDoc(PageType.page, true)}`},
    ${getSiteConfig()}
  }`

  const data: DocumentProps = await getClient(preview).fetch(query, {
    lang,
    slug,
  })

  return {
    ...data,
  }
}

interface BlogPageProps
  extends DefaultDocumentProps<{
    site?: SiteConfig
    navigation?: SiteNavigation
  }> {
  post: SanityPost
}

async function getBlogPost({
  slug,
  preview,
  lang = getDefaultLanguage().code,
}: {
  slug: string
  lang?: string
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

async function getAllPosts(): Promise<SanityPost[]> {
  const query = groq`{
    ${`"posts": *[_type == "${PageType.blog}" && category != "wiki"]  | order(dateTime(publishedAt) desc) {
        ...,
        "slug": slug.current,
        "lang": i18n_lang,
        excerpt,
        author->,
        tags[]->,
        "readingTime": round(length(pt::text(body)) / 5 / 180 )
      }`},
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

async function getAllWikiPages(): Promise<SanityPost[]> {
  const query = groq`{
    ${`"posts": *[_type == "${PageType.blog}" && category == "wiki"]  | order(dateTime(publishedAt) desc) {
        ...,
        "slug": slug.current,
        "lang": i18n_lang,
        excerpt,
        author->,
        tags[]->,
        "readingTime": round(length(pt::text(body)) / 5 / 180 )
      }`},
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

export type { DocumentProps, BlogPageProps }
export {
  getAllPages,
  getPage,
  getBlogPost,
  getAllPosts,
  getAllWikiPages,
  getSiteInfo,
}

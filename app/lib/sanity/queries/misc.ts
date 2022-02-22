import { blocks } from './page-blocks'
import { portableText } from './utils'

import { groq } from '../sanity'

export const site = groq`
  "site": *[_type == "siteSettings"][0] {
    multilang,
    "seo": {
      description,
      title
    },
    "cookieConsent": *[_type == "cookieConsent"][0]{
      ...,
      enabled,
      message[] {
        ${portableText}
      },
      tracking,
      advertisement
    }
  }
`

export const socials = groq`
  "socials": *[_type == "socials"][0].items
`

export const info = groq`
  "info": *[_type == "companyInfo"][0] {
   ...
  }
`

export const pageData: string = groq`
  ...,
  "lang": i18n_lang,
  "slug": slug.current,
  body[] {
    ${blocks}
  },
  seo,
  title
`

export const post: string = groq`
  ...,
  title,
  publishedAt,
  image,
  category,
  "slug": slug.current,
  excerpt,
  author->,
  tags[]->,
  body[] {
    ${blocks}
  },
  "readingTime": round(length(pt::text(body)) / 5 / 180 )
`

export const pageRefs = groq`
  i18n_refs,
  "refs": i18n_refs[] {
    lang,
    ref->{
      ${pageData}
    }
  }
`
export const cta = groq`
  title,
  kind,
  description,
  internalPage->{
    _id,
    ${pageData}
  },
  link
`

export const navigation = groq`
  "navigation": *[_type == "siteSettings"][0] {
    "main": mainNav->{
      "items": *[_type=="navigation" && i18n_lang == $lang && title==^.title][0].items[] {
       ${cta}
      }
    },
    "actions": actionsNav->{
      "items": *[_type=="navigation" && i18n_lang == $lang && title==^.title][0].items[] {
       ${cta}
      }
    },
    "footer": footerNav->{
      "items": *[_type=="navigation" && i18n_lang == $lang && title==^.title][0].items[] {
       ${cta}
      }
    }
  }
`

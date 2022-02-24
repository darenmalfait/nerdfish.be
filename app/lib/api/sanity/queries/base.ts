import * as query from './misc'

import { groq } from '~/lib/api/sanity'
import { PageType } from '~/types/languages'

export function getDoc(doc = PageType.page, hasLanguages = true): string {
  if (hasLanguages) {
    return groq`
    *[_type == "${doc}" && slug.current == $slug && i18n_lang == $lang] | order(_updatedAt desc)[0] {
      ${query.pageData},
      ${query.pageRefs}
    }
  `
  }

  return groq`
    *[_type == "${doc}" && slug.current == $slug] | order(_updatedAt desc)[0] {
      ${query.pageData},
      ${query.pageRefs}
    }
  `
}

export function getSiteConfig(): string {
  return groq`
    "siteConfig": {
      ${query.site},
      ${query.info},
      ${query.navigation},
      ${query.socials}
    }
  `
}

export function getDocByType(docType: string, key: string = docType) {
  return groq`
    "${key}": *[_type == "${docType}"]
  `
}

/* eslint-disable no-underscore-dangle */
import client from 'part:@sanity/base/client'

import { defaultLanguage } from './languages'

// Note: this assumes that every document that has a slug field
// have it on the `slug` field at the root
export function isUniqueAcrossAllDocuments(slug: any, options: any): any {
  const { document } = options
  const id = document._id.replace(/^drafts\./, '')
  const { i18n_lang: lang = defaultLanguage()?.code } = document

  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
    lang,
  }

  let query

  if (lang) {
    query =
      '!defined(*[!(_id in [$draft, $published]) && slug.current == $slug && i18n_lang == $lang][0]._id)'
  } else {
    query =
      '!defined(*[!(_id in [$draft, $published]) && slug.current == $slug][0]._id)'
  }

  return client.fetch(query, params)
}

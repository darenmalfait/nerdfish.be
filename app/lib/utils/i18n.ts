import languages from '../../../config/languages'

import { getRoute } from '~/lib/routes'
import { Language, PageType } from '~/types/languages'

export function validateLanguage(language: any): boolean {
  return (languages as Language[]).map(({ code }) => code).includes(language)
}

export function getDefaultLanguage(): Language {
  return (
    (languages as Language[]).find(({ isDefault }) => isDefault === true) ||
    (languages[0] as Language)
  )
}

export function isDefaultLanguage(lang: string): boolean {
  return getDefaultLanguage().code === lang
}

export function localizeSlug(
  slug: string,
  lang = getDefaultLanguage().code,
  type: PageType = PageType.page,
) {
  return getRoute(type, slug, lang)
}

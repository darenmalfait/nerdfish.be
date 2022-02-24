import languages from '../../../config/languages'
import { Language, LanguageCode, PageType } from '../../types/languages'

import { getRoute } from '~/lib/routes'

export function validateLanguage(language: any): language is LanguageCode {
  return (languages as Language[]).map(({ code }) => code).includes(language)
}

export function getDefaultLanguage(): Language {
  return (
    (languages as Language[]).find(({ isDefault }) => isDefault == true) ||
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

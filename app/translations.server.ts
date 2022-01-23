import translations from './assets/translations'

import type { LanguageCode } from './types'

function getTranslations<RequestedTranslations extends keyof Translations>(
  lang: LanguageCode,
  requestedTranslations: Array<RequestedTranslations>,
) {
  const results: Record<RequestedTranslations, string> = {} as any
  for (const translation of requestedTranslations) {
    results[translation] = translations[translation][lang]
  }

  return results
}

type Translations = typeof translations
type PickTranslations<TranslationKeys extends keyof Translations> = Record<
  TranslationKeys,
  string
>

export { translations, getTranslations }
export type { Translations, PickTranslations }

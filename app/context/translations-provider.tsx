import * as React from 'react'

import type { PickTranslations, Translations } from '~/translations.server'
import type { LanguageCode } from '~/types'

interface TranslationsContextProps {
  t: (key: keyof Translations) => string
  currentLanguage: LanguageCode
}

const TranslationsContext =
  React.createContext<TranslationsContextProps | null>(null)
TranslationsContext.displayName = 'TranslationsContext'

interface TranslationsProviderProps {
  children: React.ReactNode
  lang: LanguageCode
  translations?: PickTranslations<keyof Translations>
}

// import { TranslationsProvider } from "path-to-context/TranslationsContext"
// use <TranslationsProvider> as a wrapper around the part you need the context for
export function TranslationsProvider({
  children,
  translations,
  lang: currentLanguage,
}: TranslationsProviderProps) {
  const t = React.useCallback(
    (key: keyof Translations) => {
      return translations?.[key] ?? key
    },
    [translations],
  )

  return (
    <TranslationsContext.Provider value={{ t, currentLanguage }}>
      {children}
    </TranslationsContext.Provider>
  )
}

// import { useTranslations } fron "path-to-context/TranslationsContext"
// within functional component
// const { sessionToken, ...TranslationsContext } = useTranslations();
export function useTranslations(): TranslationsContextProps {
  const context = React.useContext(TranslationsContext)

  if (!context) {
    throw new Error(
      'You should use useTranslations within an TranslationsContext',
    )
  }

  return context
}

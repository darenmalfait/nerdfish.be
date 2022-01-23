import { ThemeProvider as DarenThemeProvider } from '@daren/theme'
import * as React from 'react'

import { ThemeProvider } from './theme-provider'
import { TranslationsProvider } from './translations-provider'

import type { LoaderData } from '~/route-containers/layout/layout.server'

interface AppProvidersProps
  extends Pick<LoaderData, 'translations' | 'lang' | 'theme'> {
  children: React.ReactNode
}

function AppProviders({
  theme,
  children,
  translations,
  lang,
}: AppProvidersProps) {
  return (
    <TranslationsProvider lang={lang} translations={translations}>
      <ThemeProvider specifiedTheme={theme}>
        <DarenThemeProvider>{children}</DarenThemeProvider>
      </ThemeProvider>
    </TranslationsProvider>
  )
}

export { AppProviders }

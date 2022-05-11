import { ThemeProvider as DarenThemeProvider } from '@daren/theme'

import { ThemeProvider } from './theme-provider'

import type { LoaderData } from '~/route-containers/layout/layout.server'

interface AppProvidersProps extends Pick<LoaderData, 'theme'> {
  children: React.ReactNode
}

function AppProviders({ theme, children }: AppProvidersProps) {
  return (
    <ThemeProvider specifiedTheme={theme}>
      <DarenThemeProvider>{children}</DarenThemeProvider>
    </ThemeProvider>
  )
}

export { AppProviders }

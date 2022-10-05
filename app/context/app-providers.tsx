import { ThemeProvider as DarenThemeProvider } from '@daren/theme'

import type { SerializeFrom } from '@remix-run/node'

import { ThemeProvider } from './theme-provider'

import type { LoaderType } from '~/route-containers/layout/layout.server'

interface AppProvidersProps extends Pick<SerializeFrom<LoaderType>, 'theme'> {
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

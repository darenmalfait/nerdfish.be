import {ThemeProvider as DarenThemeProvider} from '@daren/theme'

import {ThemeProvider} from './theme-provider'

interface AppProvidersProps {
  children: React.ReactNode
}

function AppProviders({children}: AppProvidersProps) {
  return (
    <ThemeProvider>
      <DarenThemeProvider>{children}</DarenThemeProvider>
    </ThemeProvider>
  )
}

export {AppProviders}

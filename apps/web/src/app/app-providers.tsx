'use client'

import { ThemeProvider as NerdfishThemeProvider } from '@nerdfish/theme'
import type * as React from 'react'
import { ThemeProvider } from './theme/theme-provider'

interface AppProvidersProps {
	children: React.ReactNode
}

function AppProviders({ children }: AppProvidersProps) {
	return (
		<ThemeProvider>
			<NerdfishThemeProvider>{children}</NerdfishThemeProvider>
		</ThemeProvider>
	)
}

export { AppProviders }

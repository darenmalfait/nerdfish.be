'use client'

import { ThemeProvider as NerdfishThemeProvider } from '@nerdfish/theme'
import * as React from 'react'
import { ThemeProvider } from './theme-provider'

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

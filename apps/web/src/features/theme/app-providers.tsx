'use client'

import { type ReactNode } from 'react'
import { ThemeProvider } from './theme-provider'

interface AppProvidersProps {
	children: ReactNode
}

function AppProviders({ children }: AppProvidersProps) {
	return <ThemeProvider>{children}</ThemeProvider>
}

export { AppProviders }

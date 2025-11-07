'use client'

import { NuqsAdapter } from 'nuqs/adapters/next/app'
import type * as React from 'react'
import { ThemeProvider } from './theme/theme-provider'

interface AppProvidersProps {
	children: React.ReactNode
}

function AppProviders({ children }: AppProvidersProps) {
	return (
		<NuqsAdapter>
			<ThemeProvider>{children}</ThemeProvider>
		</NuqsAdapter>
	)
}

export { AppProviders }

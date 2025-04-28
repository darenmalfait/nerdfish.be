'use client'

import { ThemeProvider as NerdfishThemeProvider } from '@nerdfish/theme'
import { TooltipProvider } from '@repo/design-system/components/ui'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import type * as React from 'react'
import { ThemeProvider } from './theme/theme-provider'

interface AppProvidersProps {
	children: React.ReactNode
}

function AppProviders({ children }: AppProvidersProps) {
	return (
		<NuqsAdapter>
			<ThemeProvider>
				<NerdfishThemeProvider>
					<TooltipProvider>{children}</TooltipProvider>
				</NerdfishThemeProvider>
			</ThemeProvider>
		</NuqsAdapter>
	)
}

export { AppProviders }

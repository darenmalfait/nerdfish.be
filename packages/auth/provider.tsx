'use client'

import type * as Clerk from '@clerk/nextjs'
import { useTheme } from 'next-themes'
import { type ReactNode } from 'react'
import { isAuthEnabled } from './enabled'

type AuthProviderProperties = {
	readonly children: ReactNode
	readonly privacyUrl?: string
	readonly termsUrl?: string
	readonly helpUrl?: string
} & Record<string, unknown>

const ClerkProvider = isAuthEnabled()
	? // eslint-disable-next-line @typescript-eslint/no-var-requires -- optional at build time
		(require('@clerk/nextjs') as typeof Clerk).ClerkProvider
	: null

export function AuthProvider({
	privacyUrl,
	termsUrl,
	helpUrl,
	children,
	...properties
}: AuthProviderProperties) {
	const { resolvedTheme } = useTheme()

	if (!ClerkProvider) {
		return children
	}

	const variables = {
		fontFamily: 'var(--font-sans)',
		fontFamilyButtons: 'var(--font-sans)',
		fontWeight: {
			bold: 'var(--font-weight-bold)',
			normal: 'var(--font-weight-normal)',
			medium: 'var(--font-weight-medium)',
		},
	}

	const elements = {
		dividerLine: 'bg-border',
		socialButtonsIconButton: 'bg-background-muted',
		navbarButton: 'text-foreground',
		organizationSwitcherTrigger__open: 'bg-background',
		organizationPreviewMainIdentifier: 'text-foreground',
		organizationSwitcherTriggerIcon: 'text-foreground-muted',
		organizationPreview__organizationSwitcherTrigger: 'gap-best-friends',
		organizationPreviewAvatarContainer: 'shrink-0',
	}

	return (
		<ClerkProvider
			{...properties}
			appearance={{
				layout: {
					privacyPageUrl: privacyUrl,
					termsPageUrl: termsUrl,
					helpPageUrl: helpUrl,
				},
				variables,
				elements,
				colorScheme: resolvedTheme === 'dark' ? 'dark' : 'light',
			}}
		>
			{children}
		</ClerkProvider>
	)
}

import { Toaster } from '@nerdfish/react/toast'
import { AuthProvider } from '@repo/auth/provider'
import { fonts } from '@repo/design-system/fonts'
import { NextIntlClientProvider } from '@repo/i18n/client'
import { i18n } from '@repo/i18n/config'
import { getMessages, setRequestLocale } from '@repo/i18n/server'
import { type WithLocale } from '@repo/i18n/types'
import { type ReactNode } from 'react'
import { AppProviders } from '../../app-providers'

import '~/app/theme/styles/global.css'

export async function generateStaticParams() {
	return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function DashboardLayout(props: {
	children: ReactNode
	params: Promise<WithLocale>
}) {
	const params = await props.params

	const { children } = props

	setRequestLocale(params.locale)

	// Using internationalization in Client Components
	const messages = await getMessages()

	return (
		<html lang={params.locale} suppressHydrationWarning>
			<body className={fonts}>
				<AppProviders>
					<NextIntlClientProvider messages={messages} locale={params.locale}>
						<AuthProvider>
							<div className="isolate flex min-h-screen flex-col">
								<main className="rounded-b-container relative w-full max-w-full flex-1">
									{children}
								</main>

								<Toaster />
							</div>
						</AuthProvider>
					</NextIntlClientProvider>
				</AppProviders>
			</body>
		</html>
	)
}

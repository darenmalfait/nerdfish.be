import { fonts } from '@repo/design-system/lib/fonts'
import { NextIntlClientProvider } from '@repo/i18n/client'
import { i18n } from '@repo/i18n/config'
import { getMessages, setRequestLocale } from '@repo/i18n/server'
import { type WithLocale } from '@repo/i18n/types'
import * as React from 'react'
import { AppProviders } from '../app-providers'
import { SiteLayout } from '../layout/site-layout'

import '~/app/theme/styles/app.css'
import '~/app/theme/styles/prose.css'
import '@repo/tailwind-config/styles/global.css'
import '@nerdfish/theme/dist/nerdfishui.css'

export async function generateStaticParams() {
	return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function RootLayout(props: {
	children: React.ReactNode
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
						<SiteLayout>{children}</SiteLayout>
					</NextIntlClientProvider>
				</AppProviders>
			</body>
		</html>
	)
}

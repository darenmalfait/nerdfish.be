import { Toaster } from '@nerdfish/react/toast'
import { fonts } from '@repo/design-system/fonts'
import { NextIntlClientProvider } from '@repo/i18n/client'
import { i18n } from '@repo/i18n/config'
import { getMessages, setRequestLocale } from '@repo/i18n/server'
import { type WithLocale } from '@repo/i18n/types'
import { type ReactNode } from 'react'
import { SiteFooter, SiteHeader, SkipLink } from '~/features/site'
import { AppProviders } from '~/features/theme'

import '~/features/theme/styles/global.css'

export async function generateStaticParams() {
	return i18n.locales.map((locale) => ({ locale }))
}

export default async function RootLayout(props: {
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
						<div className="isolate flex min-h-screen flex-col">
							<SkipLink />
							<SiteHeader />

							{/* No Suspense around children: wrapping notFound() in Suspense
							    commits HTTP 200 before the 404 status can be set. */}
							<main
								id="main-content"
								className="rounded-b-container relative w-full max-w-full flex-1"
								tabIndex={-1}
							>
								<div className="rounded-container bg-background absolute inset-0 -z-1" />
								{children}
							</main>

							<SiteFooter />
							<Toaster />
						</div>
					</NextIntlClientProvider>
				</AppProviders>
			</body>
		</html>
	)
}

import { Spinner } from '@nerdfish/react/spinner'
import { Toaster } from '@nerdfish/react/toast'
import { Section } from '@repo/design-system/components/section'
import { fonts } from '@repo/design-system/fonts'
import { NextIntlClientProvider } from '@repo/i18n/client'
import { i18n } from '@repo/i18n/config'
import { getMessages, setRequestLocale } from '@repo/i18n/server'
import { type WithLocale } from '@repo/i18n/types'
import { type ReactNode, Suspense } from 'react'
import { AppProviders } from '../../app-providers'
import { SiteFooter } from './components/site-footer'
import { SiteHeader } from './components/site-header'

import '~/app/theme/styles/global.css'

export async function generateStaticParams() {
	return i18n.locales.map((locale) => ({ lang: locale }))
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
							<SiteHeader />

							<main className="rounded-b-container relative w-full max-w-full flex-1">
								<div className="rounded-container bg-background absolute inset-0 -z-1" />
								<Suspense
									fallback={
										<Section className="motion-preset-fade motion-delay-1000 motion-duration-1000 flex min-h-screen justify-center">
											<Spinner className="size-8" />
										</Section>
									}
								>
									{children}
								</Suspense>
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

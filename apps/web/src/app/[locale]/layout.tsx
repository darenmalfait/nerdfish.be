import { Section } from '@repo/design-system/components/section'
import { LoadingAnimation, Toaster } from '@repo/design-system/components/ui'
import { fonts } from '@repo/design-system/fonts'
import { NextIntlClientProvider } from '@repo/i18n/client'
import { i18n } from '@repo/i18n/config'
import { getMessages, setRequestLocale } from '@repo/i18n/server'
import { type WithLocale } from '@repo/i18n/types'
import * as React from 'react'
import { AppProviders } from '../app-providers'
import { Footer } from '../layout/components/footer'
import { Header } from '../layout/components/header'

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
						<div className="flex min-h-screen flex-col">
							<Header />

							<main className="rounded-b-container relative w-full max-w-full flex-1">
								<div className="-z-1 rounded-container bg-background absolute inset-0" />
								<React.Suspense
									fallback={
										<Section className="motion-preset-fade motion-delay-1000 motion-duration-1000 flex min-h-screen justify-center">
											<LoadingAnimation className="size-8" variant="square" />
										</Section>
									}
								>
									{children}
								</React.Suspense>
							</main>

							<Footer />
							<Toaster />
						</div>
					</NextIntlClientProvider>
				</AppProviders>
			</body>
		</html>
	)
}

import { LoadingAnimation } from '@nerdfish/ui'
import { Section } from '@nerdfish-website/ui/components'
import { GeistSans } from 'geist/font/sans'
import * as React from 'react'
import { AppProviders } from '../app-providers'
import { getGlobalData } from '../cms/api'
import { Footer, SiteHeader } from '../common'
import { GlobalProvider } from '../global-provider'
import { getDictionary } from '../i18n/get-dictionary'
import { i18n, TranslationProvider, type WithLocale } from '~/app/i18n'

import '~/styles/tailwind.css'
import '~/styles/app.css'
import '~/styles/prose.css'
import '~/styles/components.css'
import '@nerdfish/theme/dist/nerdfishui.css'

const getLayoutData = React.cache(getGlobalData)

export async function generateStaticParams() {
	return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: WithLocale<{}>
}) {
	const layoutData = await getLayoutData(params.locale)
	const dictionary = await getDictionary(params.locale)

	return (
		<html lang={params.locale} suppressHydrationWarning>
			<body className={`${GeistSans.variable} font-sans`}>
				<AppProviders>
					<TranslationProvider
						dictionary={dictionary}
						currentLocale={params.locale}
					>
						<GlobalProvider {...layoutData}>
							<div className="flex min-h-screen flex-col">
								<SiteHeader />

								<main role="main" className="w-full flex-1">
									<React.Suspense
										fallback={
											<Section className="motion-preset-fade motion-duration-1000 flex min-h-screen justify-center">
												<LoadingAnimation className="size-8" variant="square" />
											</Section>
										}
									>
										{children}
									</React.Suspense>
								</main>

								<Footer />
							</div>
						</GlobalProvider>
					</TranslationProvider>
				</AppProviders>
			</body>
		</html>
	)
}

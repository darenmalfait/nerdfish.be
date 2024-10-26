import { LoadingAnimation } from '@nerdfish/ui'
import { Section } from '@nerdfish-website/ui/components'
import { GeistSans } from 'geist/font/sans'
import * as React from 'react'
import { getGlobalData } from '../api'
import { BaseLayoutTemplate } from '../components/base-layout'
import { GlobalProvider } from '../global-provider'
import { AppProviders } from './app-providers'
import { TranslationProvider } from './translation-provider'
import { getDictionary } from '~/get-dictionary'
import { i18n, type WithLocale } from '~/i18n-config'

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
							<BaseLayoutTemplate>
								<React.Suspense
									fallback={
										<Section className="motion-preset-fade motion-duration-1000 flex min-h-screen justify-center">
											<LoadingAnimation className="size-8" variant="square" />
										</Section>
									}
								>
									{children}
								</React.Suspense>
							</BaseLayoutTemplate>
						</GlobalProvider>
					</TranslationProvider>
				</AppProviders>
			</body>
		</html>
	)
}

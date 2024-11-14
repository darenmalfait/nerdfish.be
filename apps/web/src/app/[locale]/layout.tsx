import { GeistSans } from 'geist/font/sans'
import * as React from 'react'
import { AppProviders } from '../app-providers'
import { getGlobalData } from '../cms/api'
import { GlobalProvider } from '../global-provider'
import { getDictionary } from '../i18n/get-dictionary'
import { SiteLayout } from './site-layout'
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
							<SiteLayout>{children}</SiteLayout>
						</GlobalProvider>
					</TranslationProvider>
				</AppProviders>
			</body>
		</html>
	)
}

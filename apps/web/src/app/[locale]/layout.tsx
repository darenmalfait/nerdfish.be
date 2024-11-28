import { fonts } from '@repo/ui/fonts'
import * as React from 'react'
import { i18n } from '~/app/i18n/config'
import { TranslationProvider } from '~/app/i18n/translation-provider'
import type { WithLocale } from '~/app/i18n/types'
import { AppProviders } from '../app-providers'
import { getGlobalData } from '../cms/api'
import { GlobalProvider } from '../global-provider'
import { getTranslations } from '../i18n/get-translations'
import { SiteLayout } from '../layout/site-layout'

import '~/app/theme/styles/app.css'
import '~/app/theme/styles/prose.css'
import '~/app/theme/styles/components.css'
import '@repo/tailwind-config/styles/global.css'
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
	params: WithLocale<Record<string, never>>
}) {
	const layoutData = await getLayoutData(params.locale)
	const dictionary = await getTranslations(params.locale)

	return (
		<html lang={params.locale} suppressHydrationWarning>
			<body className={fonts}>
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

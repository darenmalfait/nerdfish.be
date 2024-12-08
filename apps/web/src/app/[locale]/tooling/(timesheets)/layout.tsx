import { fonts } from '@repo/ui/fonts'
import type * as React from 'react'
import { AppProviders } from '../../../app-providers'

import '~/app/theme/styles/app.css'
import '~/app/theme/styles/prose.css'
import '~/app/theme/styles/components.css'
import '@repo/tailwind-config/styles/global.css'
import '@nerdfish/theme/dist/nerdfishui.css'

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={fonts}>
				<AppProviders>
					<main className="bg-primary font-mono">{children}</main>
				</AppProviders>
			</body>
		</html>
	)
}

import { Sometype_Mono as someTypeMono } from 'next/font/google'
import * as React from 'react'
import { AppProviders } from '../../app-providers'

import '~/app/theme/styles/tailwind.css'
import '~/app/theme/styles/app.css'
import '~/app/theme/styles/prose.css'
import '~/app/theme/styles/components.css'
import '@nerdfish/theme/dist/nerdfishui.css'

const mono = someTypeMono({
	subsets: ['latin'],
})

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${mono.className}`}>
				<AppProviders>
					<main className="bg-primary">{children}</main>
				</AppProviders>
			</body>
		</html>
	)
}

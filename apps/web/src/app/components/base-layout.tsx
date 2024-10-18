import * as React from 'react'

import { Footer } from './footer'
import { SiteHeader } from './site-header'

export function BaseLayoutTemplate({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="flex min-h-screen flex-col">
			<SiteHeader />

			<main role="main" className="w-full flex-1">
				{children}
			</main>

			<Footer />
		</div>
	)
}

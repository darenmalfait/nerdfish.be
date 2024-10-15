import * as React from 'react'

import { Footer } from './footer'
import { SiteHeader } from './site-header'

export function BaseLayoutTemplate({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<SiteHeader />

			<main className="w-full flex-auto">{children}</main>

			<Footer />
		</>
	)
}

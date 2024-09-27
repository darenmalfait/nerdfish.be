import * as React from 'react'

import { Footer } from './footer'
import { Header } from './header'

export function BaseLayoutTemplate({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<Header />

			<main className="w-full flex-auto">{children}</main>

			<Footer />
		</>
	)
}

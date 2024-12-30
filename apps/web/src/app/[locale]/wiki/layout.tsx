import type * as React from 'react'
import { wiki } from './api'
import { getWikiPath } from './utils'

export async function generateStaticParams() {
	return (await wiki.getWikis()).map((post) => {
		return getWikiPath(post)
	})
}

export default function BlogLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return children
}

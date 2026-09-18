import type * as React from 'react'
import { wiki } from '~/features/wiki/api'
import { getWikiPath } from '~/features/wiki/utils'

export async function generateStaticParams() {
	return (await wiki.getAll()).map((post) => {
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

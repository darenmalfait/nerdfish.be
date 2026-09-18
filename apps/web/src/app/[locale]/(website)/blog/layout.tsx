import type * as React from 'react'
import { blog } from '~/features/blog/api'
import { getBlogPath } from '~/features/blog/utils'

export async function generateStaticParams() {
	return (await blog.getAll()).map((post) => {
		return getBlogPath(post)
	})
}

export default function BlogLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return children
}

import type * as React from 'react'
import { blog } from './api'
import { getBlogPath } from './utils'

export async function generateStaticParams() {
	return (await blog.getPosts()).map((post) => {
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

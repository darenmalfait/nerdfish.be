import type * as React from 'react'
import { getWorks } from './api'
import { getWorkPath } from './utils'

export async function generateStaticParams() {
	return ((await getWorks()) ?? []).map((work) => {
		return getWorkPath(work)
	})
}

export default function WorkLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return children
}

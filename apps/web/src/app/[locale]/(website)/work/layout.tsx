import type * as React from 'react'
import { work } from './api'
import { getWorkPath } from './utils'

export async function generateStaticParams() {
	const works = await work.getAll()

	return works.map((item) => {
		return getWorkPath(item)
	})
}

export default function WorkLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return children
}

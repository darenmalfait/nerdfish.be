import type * as React from 'react'
import { work } from '~/features/work/api'
import { getWorkPath } from '~/features/work/utils'

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

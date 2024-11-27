'use client'

import { Button } from '@nerdfish/ui'
import { ChevronLeftIcon } from '@repo/ui/icons'
import Link from 'next/link'
import { useGlobal } from '~/app/global-provider'

export function BackToBlog() {
	const { paths } = useGlobal()

	if (!paths?.blog) return null

	return (
		<Button variant="outline" asChild>
			<Link href={paths.blog}>
				<ChevronLeftIcon className="mr-2 size-4" />
				All blog articles
			</Link>
		</Button>
	)
}

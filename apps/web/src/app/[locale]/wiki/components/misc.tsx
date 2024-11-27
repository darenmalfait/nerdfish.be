'use client'

import { Button } from '@nerdfish/ui'
import { ChevronLeftIcon } from '@repo/ui/icons'
import Link from 'next/link'
import { useGlobal } from '~/app/global-provider'

export function BackToWiki() {
	const { paths } = useGlobal()

	if (!paths?.wiki) return null

	return (
		<Button variant="outline" asChild>
			<Link href={paths.wiki}>
				<ChevronLeftIcon className="mr-2 size-4" />
				All wiki pages
			</Link>
		</Button>
	)
}

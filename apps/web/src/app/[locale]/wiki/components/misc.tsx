'use client'

import { Button } from '@repo/design-system/components/ui'
import { ChevronLeftIcon } from '@repo/design-system/lib/icons'
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

'use client'

import { Button } from '@nerdfish/ui'
import { Icons } from '@nerdfish-website/ui/icons'
import Link from 'next/link'
import { useGlobal } from '~/app/global-provider'

export function BackToWiki() {
	const { paths } = useGlobal()

	if (!paths?.wiki) return null

	return (
		<Button variant="outline" asChild>
			<Link href={paths.wiki}>
				<Icons.ChevronLeft className="mr-2 size-4" />
				All wiki pages
			</Link>
		</Button>
	)
}

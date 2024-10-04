'use client'

import { Button } from '@nerdfish/ui'
import { Icons } from '@nerdfish-website/ui/icons'
import Link from 'next/link'
import { useGlobal } from '~/app/global-provider'

export function BackToBlog() {
	const { paths } = useGlobal()

	if (!paths?.blog) return null

	return (
		<Button variant="outline" asChild>
			<Link href={paths.blog}>
				<Icons.ChevronLeft className="mr-2" />
				All blog articles
			</Link>
		</Button>
	)
}

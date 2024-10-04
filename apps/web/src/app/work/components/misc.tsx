'use client'

import { Button } from '@nerdfish/ui'
import { Icons } from '@nerdfish-website/ui/icons'
import Link from 'next/link'
import { useGlobal } from '~/app/global-provider'

export function BackToWork() {
	const { paths } = useGlobal()

	if (!paths?.work) return null

	return (
		<Button variant="outline" asChild>
			<Link href={paths.work}>
				<Icons.ChevronLeft className="mr-2" />
				More work
			</Link>
		</Button>
	)
}

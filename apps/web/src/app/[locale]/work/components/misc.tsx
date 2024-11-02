'use client'

import { Button } from '@nerdfish/ui'
import { ChevronLeftIcon } from '@nerdfish-website/ui/icons'
import Link from 'next/link'
import { useGlobal } from '~/app/[locale]/global-provider'

export function BackToWork() {
	const { paths } = useGlobal()

	if (!paths?.work) return null

	return (
		<Button variant="outline" asChild>
			<Link href={paths.work}>
				<ChevronLeftIcon className="mr-2 size-4" />
				More work
			</Link>
		</Button>
	)
}

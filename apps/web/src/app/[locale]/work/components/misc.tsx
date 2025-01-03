'use client'

import { Button } from '@repo/design-system/components/ui'
import { ChevronLeftIcon } from '@repo/design-system/lib/icons'
import Link from 'next/link'
import { useGlobal } from '~/app/global-provider'

export function BackToWork() {
	const { paths } = useGlobal()

	return (
		<Button variant="outline" asChild>
			<Link href={paths.work}>
				<ChevronLeftIcon className="mr-2 size-4" />
				More work
			</Link>
		</Button>
	)
}

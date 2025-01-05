'use client'

import { Button } from '@repo/design-system/components/ui'
import { ChevronLeftIcon } from '@repo/design-system/lib/icons'
import { Link } from '~/app/components/link'

export function BackToWiki() {
	return (
		<Button variant="outline" asChild>
			<Link href="/wiki">
				<ChevronLeftIcon className="mr-2 size-4" />
				All wiki pages
			</Link>
		</Button>
	)
}

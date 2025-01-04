'use client'

import { Button } from '@repo/design-system/components/ui'
import { ChevronLeftIcon } from '@repo/design-system/lib/icons'
import { useLocale } from '@repo/i18n/client'
import Link from 'next/link'
import { getLocalizedPath } from '../../utils'

export function BackToWork() {
	const locale = useLocale()

	return (
		<Button variant="outline" asChild>
			<Link href={getLocalizedPath('work', locale)}>
				<ChevronLeftIcon className="mr-2 size-4" />
				More work
			</Link>
		</Button>
	)
}

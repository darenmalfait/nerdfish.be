'use client'

import { Button } from '@repo/design-system/components/ui'
import { ChevronLeftIcon } from '@repo/design-system/lib/icons'
import { useTranslations } from '@repo/i18n/client'
import { Link } from '~/app/components/link'

export function BackToWork() {
	const t = useTranslations('work.overview')

	return (
		<Button variant="outline" asChild>
			<Link href="/work">
				<ChevronLeftIcon className="mr-2 size-4" />
				{t('backToWork')}
			</Link>
		</Button>
	)
}

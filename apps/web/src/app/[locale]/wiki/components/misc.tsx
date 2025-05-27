'use client'

import { Button } from '@repo/design-system/components/ui'
import { ChevronLeftIcon } from '@repo/design-system/icons'
import { useTranslations } from '@repo/i18n/client'
import { Link } from '~/app/components/link'

export function BackToWiki() {
	const t = useTranslations('wiki.overview')

	return (
		<Button variant="default" size="sm" asChild>
			<Link href="/wiki">
				<ChevronLeftIcon className="mr-2 size-4" />
				{t('backToWiki')}
			</Link>
		</Button>
	)
}

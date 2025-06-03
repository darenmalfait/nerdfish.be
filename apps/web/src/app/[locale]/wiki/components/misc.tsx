'use client'

import { Button } from '@repo/design-system/components/ui'
import { ChevronLeftIcon } from '@repo/design-system/icons'
import { useTranslations } from '@repo/i18n/client'
import { Link } from '~/app/components/link'

export function BackToWiki() {
	const t = useTranslations('wiki.overview')

	return (
		<Button variant="ghost" className="group -mx-[1.5rem]" asChild>
			<Link href="/wiki">
				<ChevronLeftIcon className="group-hover:-translate-x-xs mr-sm size-4 transition-transform" />
				{t('backToWiki')}
			</Link>
		</Button>
	)
}

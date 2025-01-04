'use client'

import { Button } from '@repo/design-system/components/ui'
import { ChevronLeftIcon } from '@repo/design-system/lib/icons'
import { useLocale, useTranslations } from '@repo/i18n/client'
import Link from 'next/link'
import { getLocalizedPath } from '../../utils'

export function BackToBlog() {
	const t = useTranslations('blog')
	const locale = useLocale()

	return (
		<Button variant="ghost" className="-mx-md group" asChild>
			<Link href={getLocalizedPath('blog', locale)}>
				<ChevronLeftIcon className="group-hover:-translate-x-xs mr-sm size-4 transition-transform" />
				{t('seeAll')}
			</Link>
		</Button>
	)
}

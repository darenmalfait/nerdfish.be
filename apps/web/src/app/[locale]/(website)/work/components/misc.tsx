'use client'

import { Button } from '@nerdfish/react/button'
import { ChevronLeftIcon } from '@repo/design-system/icons'
import { useTranslations } from '@repo/i18n/client'
import { Link } from '../../components/link'

export function BackToWork() {
	const t = useTranslations('work.overview')

	return (
		<Button
			variant="outline"
			render={
				<Link href="/work">
					<ChevronLeftIcon className="mr-2 size-4" />
					{t('backToWork')}
				</Link>
			}
		/>
	)
}

'use client'

import { Button } from '@nerdfish/ui'
import { ChevronLeftIcon } from '@repo/ui/icons'
import Link from 'next/link'
import { useGlobal } from '~/app/global-provider'
import { useTranslation } from '~/app/i18n/translation-provider'

export function BackToBlog() {
	const { t } = useTranslation()
	const { paths } = useGlobal()

	if (!paths?.blog) return null

	return (
		<Button variant="outline" asChild>
			<Link href={paths.blog}>
				<ChevronLeftIcon className="mr-2 size-4" />
				{t('global.allArticles')}
			</Link>
		</Button>
	)
}

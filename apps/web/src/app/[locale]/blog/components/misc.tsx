'use client'

import { Button } from '@nerdfish/ui'
import { ChevronLeftIcon } from '@repo/ui/icons'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useGlobal } from '~/app/global-provider'

export function BackToBlog() {
	const t = useTranslations('blog')
	const { paths } = useGlobal()

	if (!paths?.blog) return null

	return (
		<Button variant="ghost" className="-mx-md group" asChild>
			<Link href={paths.blog}>
				<ChevronLeftIcon className="group-hover:-translate-x-xs mr-sm size-4 transition-transform" />
				{t('seeAll')}
			</Link>
		</Button>
	)
}

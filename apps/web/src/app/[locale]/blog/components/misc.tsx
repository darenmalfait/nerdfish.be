'use client'

import { Button } from '@repo/design-system/components/ui'
import { ChevronLeftIcon } from '@repo/design-system/lib/icons'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
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

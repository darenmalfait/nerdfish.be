'use client'

import { Button } from '@repo/design-system/components/ui'
import { ChevronLeftIcon } from '@repo/design-system/icons'
import { useTranslations } from '@repo/i18n/client'
import { Link } from '~/app/components/link'

export function BackToBlog() {
	const t = useTranslations('blog.content')

	return (
		<Button variant="ghost" className="-mx-md group" asChild>
			<Link href="/blog">
				<ChevronLeftIcon className="group-hover:-translate-x-xs mr-sm size-4 transition-transform" />
				{t('backToBlog')}
			</Link>
		</Button>
	)
}

'use client'

import { Button } from '@nerdfish/react/button'
import { ChevronLeftIcon } from '@repo/design-system/icons'
import { useTranslations } from '@repo/i18n/client'
import { Link } from '~/app/components/link'

export function BackToBlog() {
	const t = useTranslations('blog.content')

	return (
		<Button
			variant="secondary"
			className="group no-underline"
			render={
				<Link href="/blog">
					<ChevronLeftIcon className="size-4 transition-transform" />
					{t('backToBlog')}
				</Link>
			}
		/>
	)
}

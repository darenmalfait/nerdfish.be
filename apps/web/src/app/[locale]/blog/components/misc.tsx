'use client'

import { Button } from '@nerdfish/react/button'
import { ChevronLeftIcon } from '@repo/design-system/icons'
import { useTranslations } from '@repo/i18n/client'
import { Link } from '~/app/components/link'

export function BackToBlog() {
	const t = useTranslations('blog.content')

	return (
		<Button
			variant="link"
			className="group -mx-[1.5rem] no-underline"
			render={
				<Link href="/blog">
					<ChevronLeftIcon className="group-hover:-translate-x-bff mr-best-friends size-4 transition-transform" />
					{t('backToBlog')}
				</Link>
			}
		/>
	)
}

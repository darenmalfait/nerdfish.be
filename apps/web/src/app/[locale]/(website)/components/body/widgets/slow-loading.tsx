'use client'

import { Card, CardContent, CardHeader } from '@nerdfish/react/card'
import { Skeleton } from '@nerdfish/react/skeleton'
import { Spinner } from '@nerdfish/react/spinner'
import { useTranslations } from '@repo/i18n/client'

export function SlowLoading() {
	const t = useTranslations('widgets.slowLoading')

	return (
		<div className="gap-friends py-2xl flex flex-col">
			<Card className="bg-background-muted mx-auto w-full max-w-sm">
				<CardHeader>
					<div className="relative flex h-36 w-full items-center justify-center">
						<Skeleton className="absolute inset-0 h-36 w-full object-cover" />
						<Spinner />
					</div>
				</CardHeader>
				<CardContent>
					<div className="gap-best-friends flex flex-col">
						<Skeleton className="h-3 w-1/2" />
						<Skeleton className="h-3 w-3/4" />
						<Skeleton className="h-3 w-1/3" />
					</div>
				</CardContent>
			</Card>
			<caption className="text-foreground-muted text-sm">
				{t('caption')}
			</caption>
		</div>
	)
}

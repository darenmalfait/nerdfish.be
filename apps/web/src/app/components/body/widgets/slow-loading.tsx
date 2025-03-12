'use client'

import {
	Card,
	CardContent,
	CardHeader,
	LoadingAnimation,
	Skeleton,
} from '@repo/design-system/components/ui'
import { useTranslations } from '@repo/i18n/client'
import React from 'react'

export function SlowLoading() {
	const t = useTranslations('widgets.slowLoading')

	return (
		<div className="gap-md py-2xl flex flex-col">
			<Card className="bg-background-muted mx-auto w-full max-w-sm">
				<CardHeader>
					<div className="relative flex h-36 w-full items-center justify-center">
						<Skeleton className="absolute inset-0 h-36 w-full object-cover" />
						<LoadingAnimation variant="classic" />
					</div>
				</CardHeader>
				<CardContent>
					<div className="gap-sm flex flex-col">
						<Skeleton className="h-3 w-1/2" />
						<Skeleton className="h-3 w-3/4" />
						<Skeleton className="h-3 w-1/3" />
					</div>
				</CardContent>
			</Card>
			<caption className="text-foreground-muted-foreground text-sm">
				{t('caption')}
			</caption>
		</div>
	)
}

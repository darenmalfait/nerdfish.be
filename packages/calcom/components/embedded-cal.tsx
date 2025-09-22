'use client'

import Cal, { getCalApi } from '@calcom/embed-react'
import { Skeleton } from '@repo/design-system/components/ui'
import { useEffect, useState } from 'react'
import { type CalComMeetingTypes, calcomSettings } from '../config'

export function EmbeddedCal({
	bookingType = '30min',
	className,
	theme,
}: {
	bookingType: CalComMeetingTypes
	className?: string
	theme?: 'light' | 'dark' | 'system'
}) {
	const [calLoading, setCalLoading] = useState<boolean>(true)

	useEffect(() => {
		async function loadCal() {
			const cal = await getCalApi({
				namespace: `${calcomSettings.profileName}/${bookingType}`,
			})
			cal('ui', {
				styles: {
					branding: { brandColor: '#D46536' },
					body: { background: 'transparent' },
				},
				hideEventTypeDetails: false,
				layout: 'month_view',
				theme: theme === 'system' ? 'auto' : (theme as 'auto'),
			})

			setCalLoading(false)
		}

		void loadCal()
	}, [bookingType, theme])

	return (
		<div>
			{calLoading ? (
				<div className="aspect-2 border-booker border-booker-width bg-default mx-auto w-full max-w-3xl rounded-md">
					<Skeleton className="h-full w-full" />
				</div>
			) : null}
			<Cal
				className={className}
				calLink={`${calcomSettings.profileName}/${bookingType}`}
				config={{ theme: theme === 'system' ? 'auto' : (theme as 'auto') }}
			/>
		</div>
	)
}

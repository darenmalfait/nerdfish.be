'use client'

import Cal, { getCalApi } from '@calcom/embed-react'
import { Skeleton } from '@nerdfish/ui'
import * as React from 'react'
import { type GlobalCalcomTypes } from '~/app/cms'
import { useGlobal } from '~/app/global-provider'
import { useTheme } from '~/app/theme'

export function EmbeddedCal({
	bookingType = '30min',
	className,
}: {
	bookingType: GlobalCalcomTypes['slug']
	className?: string
}) {
	const [calLoading, setCalLoading] = React.useState<boolean>(true)
	const { theme } = useTheme()
	const { calcom } = useGlobal()

	React.useEffect(() => {
		async function loadCal() {
			const cal = await getCalApi({
				namespace: `${calcom?.profileName}/${bookingType}`,
			})
			cal('ui', {
				styles: {
					branding: { brandColor: '#D46536' },
					body: { background: 'transparent' },
				},
				hideEventTypeDetails: false,
				layout: 'month_view',
				theme: theme === 'system' ? 'auto' : (theme as any),
			})

			setCalLoading(false)
		}

		void loadCal()
	}, [bookingType, calcom?.profileName, theme])

	if (!calcom?.profileName) return null

	return (
		<div>
			{calLoading ? (
				<div className="border-booker border-booker-width bg-default aspect-2 mx-auto w-full max-w-3xl rounded-md">
					<Skeleton className="h-full w-full" />
				</div>
			) : null}
			<Cal
				className={className}
				calLink={`${calcom.profileName}/${bookingType}`}
				config={{ theme: theme === 'system' ? 'auto' : (theme as any) }}
			/>
		</div>
	)
}

'use client'

import Cal, { getCalApi } from '@calcom/embed-react'
import { Card, CardContent, CardHeader, Skeleton } from '@nerdfish/ui'
import { Section } from '@nerdfish-website/ui/components'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { Header } from '../components'
import { PortableText, type Block, type PageBlocksBooking } from '~/app/cms'
import { useGlobal } from '~/app/global-provider'
import { useTheme } from '~/app/theme-provider'

export function BookingBlock(props: Block<PageBlocksBooking>) {
	const [calLoading, setCalLoading] = React.useState<boolean>(true)
	const { title, subtitle, content } = props

	const { companyInfo } = useGlobal()
	const { theme } = useTheme()

	React.useEffect(() => {
		async function loadCal() {
			await getCalApi()
			setCalLoading(false)
		}

		void loadCal()
	}, [])

	if (!companyInfo?.calcom) return null

	return (
		<div
			className="bg-muted rounded-semi mx-2"
			data-tina-field={tinaField(props, 'title')}
		>
			<Section>
				<Card className="rounded-semi bg-primary relative mx-auto max-w-3xl overflow-hidden p-8">
					{(title ?? subtitle) ? (
						<CardHeader>
							<Header
								data-tina-field={tinaField(props, 'subtitle')}
								title={title?.toString()}
								subtitle={subtitle}
							/>
						</CardHeader>
					) : null}
					<CardContent>
						<div className="prose dark:prose-invert">
							<PortableText
								content={content}
								data-tina-field={tinaField(props, 'content')}
							/>
						</div>
						{calLoading ? (
							<div className="border-booker border-booker-width bg-default aspect-2 px- mx-auto w-full max-w-3xl rounded-md">
								<Skeleton className="h-full w-full" />
							</div>
						) : null}
						<Cal
							className="rounded-semi w-full border-none"
							calLink={companyInfo.calcom}
							config={{ theme: theme === 'system' ? 'auto' : (theme as any) }}
						/>
					</CardContent>
				</Card>
			</Section>
		</div>
	)
}

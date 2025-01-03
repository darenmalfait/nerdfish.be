'use client'

import { EmbeddedCal } from '@repo/calcom/components/embedded-cal'
import { MeetingTypeList } from '@repo/calcom/components/meeting-type-list'
import { type CalComMeetingTypes } from '@repo/calcom/config'
import { DrawerDialog } from '@repo/design-system/components/drawer-dialog'
import { Section } from '@repo/design-system/components/section'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Skeleton,
} from '@repo/design-system/components/ui'
import { useLocale } from '@repo/i18n/client'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { PortableText } from '~/app/cms/components/portable-text'
import { type Block, type PageBlocksBooking } from '~/app/cms/types'

export function BookingBlock(props: Block<PageBlocksBooking>) {
	const { title, subtitle, content } = props
	const locale = useLocale()

	const [bookingType, setBookingType] =
		React.useState<CalComMeetingTypes | null>(null)

	return (
		<Section>
			<Card className="rounded-container bg-secondary p-lg relative mx-auto w-full max-w-3xl overflow-hidden">
				<CardHeader className="p-lg bg-transparent pb-0">
					<CardTitle data-tina-field={tinaField(props, 'title')}>
						{title}
					</CardTitle>
					<CardDescription data-tina-field={tinaField(props, 'subtitle')}>
						{subtitle}
					</CardDescription>
				</CardHeader>
				<CardContent className="p-lg pt-0">
					<div className="prose dark:prose-invert">
						<PortableText
							content={content}
							data-tina-field={tinaField(props, 'content')}
						/>
					</div>

					<div className="mx-auto max-w-3xl">
						<div className="mb-lg w-full text-center">
							<Avatar className="shadow-outline mx-auto size-24">
								<AvatarImage
									alt="Darens avatar"
									src="/images/avatar.jpg"
									className="bg-muted object-cover"
								/>
								<AvatarFallback>
									<Skeleton className="h-full w-full" />
								</AvatarFallback>
							</Avatar>
						</div>
						<nav>
							<MeetingTypeList
								locale={locale}
								onSelect={(slug) => setBookingType(slug)}
							/>
						</nav>
					</div>
					<DrawerDialog
						open={!!bookingType}
						onOpenChange={(nextState) => {
							if (!nextState) {
								return setBookingType(null)
							}
						}}
					>
						{bookingType ? (
							<EmbeddedCal
								className="[&_iframe]:h-fit [&_iframe]:max-h-[85vh] [&_iframe]:overflow-y-scroll"
								bookingType={bookingType}
							/>
						) : null}
					</DrawerDialog>
				</CardContent>
			</Card>
		</Section>
	)
}

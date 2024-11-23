'use client'

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Badge,
	Card,
	CardContent,
	CardHeader,
	Dialog,
	DialogContent,
	Skeleton,
	Drawer,
	useMediaQuery,
	DrawerContent,
	CardTitle,
	CardDescription,
} from '@nerdfish/ui'
import { Section } from '@nerdfish-website/ui/components'
import { ArrowRightIcon, ClockIcon } from '@nerdfish-website/ui/icons'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { EmbeddedCal } from '../components/embedded-cal'
import {
	type GlobalCalcomTypes,
	PortableText,
	type Block,
	type PageBlocksBooking,
} from '~/app/cms'
import { useGlobal } from '~/app/global-provider'

function DrawerDialog({
	open,
	onOpenChange,
	children,
}: {
	open: boolean
	onOpenChange: (open: boolean) => void
	children: React.ReactNode
}) {
	const isDesktop = useMediaQuery('(min-width: 768px)')

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogContent className="rounded-large bg-primary relative overflow-hidden !p-0 transition-all">
					{children}
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerContent className="bg-primary transition-all">
				{children}
			</DrawerContent>
		</Drawer>
	)
}

export function BookingBlock(props: Block<PageBlocksBooking>) {
	const { title, subtitle, content } = props

	const { calcom } = useGlobal()
	const [bookingType, setBookingType] = React.useState<any>()

	if (!calcom?.profileName) return null

	return (
		<Section>
			<Card className="rounded-large p-lg bg-secondary relative mx-auto w-full max-w-3xl overflow-hidden">
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
							<ul className="gap-sm flex flex-col">
								{((calcom.types ?? []) as GlobalCalcomTypes[]).map(
									({ slug, title: bookingTitle, duration }) => (
										<li
											className="bg-primary hover:bg-muted shadow-outline rounded-semi"
											key={slug}
										>
											<button
												onClick={() => setBookingType(slug)}
												className="w-full outline-none"
												aria-label={`Book ${bookingTitle}`}
											>
												<div className="flex w-full items-start justify-between gap-4 p-5">
													<div className="flex flex-col">
														<div className="mb-sm text-lg font-semibold">
															{bookingTitle}
														</div>
														<div className="flex w-full">
															<Badge
																variant="secondary"
																className="inline-flex w-auto items-center"
															>
																<ClockIcon className="mr-sm size-3" />
																{duration} minutes
															</Badge>
														</div>
													</div>
													<div>
														<ArrowRightIcon className="size-4 opacity-20 transition group-hover:opacity-100" />
													</div>
												</div>
											</button>
										</li>
									),
								)}
							</ul>
						</nav>
					</div>
					<DrawerDialog
						open={!!calcom.types?.find((type) => type?.slug === bookingType)}
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

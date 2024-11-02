'use client'

import Cal, { getCalApi } from '@calcom/embed-react'
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
	DrawerHeader,
	DrawerContent,
	ScrollArea,
} from '@nerdfish/ui'
import { Section } from '@nerdfish-website/ui/components'
import { ArrowRightIcon, ClockIcon } from '@nerdfish-website/ui/icons'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { useGlobal } from '~/app/[locale]/global-provider'
import {
	type GlobalCalcomTypes,
	PortableText,
	type Block,
	type PageBlocksBooking,
} from '~/app/cms'
import {
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '~/app/common'
import { useTheme } from '~/app/theme-provider'

function EmbeddedCal({
	bookingType,
}: {
	bookingType: GlobalCalcomTypes['slug']
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
		<div className="overflow-hidden">
			{calLoading ? (
				<div className="border-booker border-booker-width bg-default aspect-2 mx-auto w-full max-w-3xl rounded-md">
					<Skeleton className="h-full w-full" />
				</div>
			) : null}
			<Cal
				style={{ width: '100%', height: '100%', overflow: 'scroll' }}
				calLink={`${calcom.profileName}/${bookingType}`}
				config={{ theme: theme === 'system' ? 'auto' : (theme as any) }}
			/>
		</div>
	)
}

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
				<DialogContent className="rounded-semi bg-primary overflow-hidden !p-0 transition-all">
					<ScrollArea className="h-fit max-h-[85vh] overflow-auto">
						{children}
					</ScrollArea>
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerContent className="bg-primary transition-all">
				<DrawerHeader className="bg-transparent pb-0" />
				<ScrollArea className="h-fit max-h-[85vh] overflow-auto">
					{children}
				</ScrollArea>
			</DrawerContent>
		</Drawer>
	)
}

export function BookingBlock(props: Block<PageBlocksBooking>) {
	const { title, subtitle, content } = props

	const router = useRouter()
	const searchParams = useSearchParams()
	const { calcom } = useGlobal()

	const bookingType = searchParams.get('booking')

	const setBookingType = React.useCallback(
		async (type: GlobalCalcomTypes['slug'] | null) => {
			const params = new URLSearchParams(searchParams)

			if (type) params.set('booking', type)
			else params.delete('booking')

			router.push(`?${params.toString()}`)
		},
		[router, searchParams],
	)

	const getBookingLink = React.useCallback(
		(type: string) => {
			const params = new URLSearchParams(searchParams)
			params.set('booking', type)

			return `?${params.toString()}`
		},
		[searchParams],
	)

	if (!calcom?.profileName) return null

	return (
		<div
			className="bg-muted rounded-semi mx-sm"
			data-tina-field={tinaField(props, 'title')}
		>
			<Section>
				<Card className="rounded-semi bg-primary relative mx-auto w-full max-w-3xl overflow-hidden">
					<CardHeader className="p-lg pb-0">
						<SectionHeader>
							<SectionHeaderTitle
								data-tina-field={tinaField(props, 'title')}
								animatedText={title ?? undefined}
							/>
							<SectionHeaderSubtitle
								data-tina-field={tinaField(props, 'subtitle')}
							>
								{subtitle}
							</SectionHeaderSubtitle>
						</SectionHeader>
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
								<ul className="flex flex-col">
									{((calcom.types ?? []) as GlobalCalcomTypes[]).map(
										({ slug, title: bookingTitle, duration }) => (
											<li
												className="bg-primary hover:bg-muted shadow-outline focus-within:outline-active group relative border-b transition first:rounded-t-md last:rounded-b-md last:border-b-0"
												key={slug}
											>
												<Link
													href={getBookingLink(slug ?? '')}
													className="outline-none"
													aria-label={`Book ${bookingTitle}`}
												>
													<div className="flex w-full items-start justify-between gap-4 p-5">
														<div className="flex flex-col">
															<div className="mb-sm text-lg font-semibold">
																{bookingTitle}
															</div>
															<div>
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
												</Link>
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
							{bookingType ? <EmbeddedCal bookingType={bookingType} /> : null}
						</DrawerDialog>
					</CardContent>
				</Card>
			</Section>
		</div>
	)
}

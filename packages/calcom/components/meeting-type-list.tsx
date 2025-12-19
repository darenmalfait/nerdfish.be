'use client'

import { Badge } from '@nerdfish/react/badge'
import { ClockIcon, ArrowRightIcon } from '@repo/design-system/icons'
import { type Locale } from '@repo/i18n/types'
import { cn } from '@repo/lib/utils/class'
import { type ComponentProps } from 'react'
import { type CalComMeetingTypes, calcomSettings } from '../config'

export interface MeetingTypeListProps extends Omit<
	ComponentProps<'ul'>,
	'onSelect'
> {
	onSelect: (slug: CalComMeetingTypes) => void
	locale: Locale
}

export function MeetingTypeList({
	onSelect,
	className,
	locale,
	...props
}: MeetingTypeListProps) {
	return (
		<ul className={cn('gap-best-friends flex flex-col', className)} {...props}>
			{calcomSettings.types.map(({ slug, title: bookingTitle, duration }) => {
				const title = (bookingTitle as Record<Locale, string>)[locale]

				return (
					<li
						className="rounded-base bg-background border-border hover:bg-background-muted"
						key={slug}
					>
						<button
							onClick={() => onSelect(slug)}
							className="w-full outline-none"
							aria-label={`Book ${title}`}
						>
							<div className="flex w-full items-start justify-between gap-4 p-5">
								<div className="flex flex-col">
									<div className="mb-best-friends text-lg font-semibold">
										{title}
									</div>
									<div className="flex w-full">
										<Badge
											variant="muted"
											className="inline-flex w-auto items-center"
										>
											<ClockIcon className="mr-best-friends size-3" />
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
				)
			})}
		</ul>
	)
}

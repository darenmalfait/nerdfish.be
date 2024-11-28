'use client'

import { Drawer, DrawerContent } from '@nerdfish/ui'
import { DrawerDialog } from '@repo/ui/components/drawer-dialog'
import { MagnetButton } from '@repo/ui/components/magnet-button'
import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/ui/components/section'
import { TextSlideUp } from '@repo/ui/components/text-slide-up'
import { ArrowRightIcon, CalendarClockIcon } from '@repo/ui/icons'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import type { Block, PageBlocksContact } from '~/app/cms/types'
import { useTranslation } from '~/app/i18n/translation-provider'
import { ContactForm } from '../components/contact-form'
import { EmbeddedCal } from '../components/embedded-cal'

export function ContactBlock(props: Block<PageBlocksContact>) {
	const { title, subtitle, openFormLabel, formTitle, formSubtitle } = props
	const { t } = useTranslation()

	const [contactFormOpen, setContactFormOpen] = React.useState<boolean>(false)
	const [bookingFormOpen, setBookingFormOpen] = React.useState<boolean>(false)

	return (
		<Section>
			<SectionHeader>
				<SectionHeaderTitle data-tina-field={tinaField(props, 'title')}>
					{title}
				</SectionHeaderTitle>
				<SectionHeaderSubtitle data-tina-field={tinaField(props, 'subtitle')}>
					{subtitle}
				</SectionHeaderSubtitle>
			</SectionHeader>
			<TextSlideUp
				delay={400}
				className="!overflow-visible flex flex-col items-center gap-lg md:flex-row"
			>
				<MagnetButton
					type="button"
					onClick={() => setContactFormOpen(true)}
					size="xl"
					className="motion-opacity-in-[0%] motion-delay-500 group w-full"
				>
					{openFormLabel}
					<ArrowRightIcon className="ml-md text-accent transition-all group-hover:translate-x-sm group-hover:text-inverted" />
				</MagnetButton>
				<MagnetButton
					type="button"
					onClick={() => setBookingFormOpen(true)}
					variant="outline"
					className="group"
					size="xl"
				>
					<span className="flex items-center">
						<CalendarClockIcon className="group-hover:motion-preset-seesaw mr-md size-6 text-success" />

						{t('contact.booking.title')}
					</span>
				</MagnetButton>
			</TextSlideUp>

			<Drawer open={contactFormOpen} onOpenChange={setContactFormOpen}>
				<DrawerContent className="max-h-[85vh] bg-primary">
					<div className="container pb-xl">
						<SectionHeader>
							<SectionHeaderTitle
								data-tina-field={tinaField(props, 'formTitle')}
							>
								{formTitle}
							</SectionHeaderTitle>
							<SectionHeaderSubtitle
								data-tina-field={tinaField(props, 'formSubtitle')}
							>
								{formSubtitle}
							</SectionHeaderSubtitle>
						</SectionHeader>
						<ContactForm />
					</div>
				</DrawerContent>
			</Drawer>
			<DrawerDialog open={bookingFormOpen} onOpenChange={setBookingFormOpen}>
				<EmbeddedCal
					className="[&_iframe]:h-fit [&_iframe]:max-h-[85vh] [&_iframe]:overflow-y-scroll"
					bookingType="30min"
				/>
			</DrawerDialog>
		</Section>
	)
}

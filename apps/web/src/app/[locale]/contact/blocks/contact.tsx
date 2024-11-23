'use client'

import { Drawer, DrawerContent } from '@nerdfish/ui'
import {
	Section,
	TextSlideUp,
	MagnetButton,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
	DrawerDialog,
} from '@nerdfish-website/ui/components'
import { ArrowRightIcon, CalendarClockIcon } from '@nerdfish-website/ui/icons'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { ContactForm } from '../components/contact-form'
import { EmbeddedCal } from '../components/embedded-cal'
import { type PageBlocksContact, type Block } from '~/app/cms'
import { useTranslation } from '~/app/i18n'

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
				className="gap-lg flex items-center !overflow-visible"
			>
				<MagnetButton
					type="button"
					onClick={() => setContactFormOpen(true)}
					size="xl"
					className="motion-opacity-in-[0%] motion-delay-500 group"
				>
					{openFormLabel}
					<ArrowRightIcon className="ml-md text-accent group-hover:translate-x-sm group-hover:text-inverted transition-all" />
				</MagnetButton>
				<MagnetButton
					type="button"
					onClick={() => setBookingFormOpen(true)}
					variant="outline"
					className="group"
					size="xl"
				>
					<span className="flex items-center">
						<CalendarClockIcon className="text-success mr-md group-hover:motion-preset-seesaw size-6" />

						{t('contact.booking.title')}
					</span>
				</MagnetButton>
			</TextSlideUp>

			<Drawer open={contactFormOpen} onOpenChange={setContactFormOpen}>
				<DrawerContent className="bg-primary max-h-[85vh]">
					<div className="pb-xl px-md container mx-auto">
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

'use client'

import { MagnetButton } from '@repo/design-system/components/magnet'
import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/design-system/components/section'
import { TextSlideUp } from '@repo/design-system/components/text-slide-up'
import {
	Drawer,
	DrawerContent,
	DrawerTitle,
} from '@repo/design-system/components/ui'
import { ArrowRightIcon } from '@repo/design-system/lib/icons'
import { useTranslations } from '@repo/i18n/client'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { ContactForm } from './components/contact-form'
import { type Block, type PageBlocksContact } from '~/app/cms/types'

export function ContactBlock(props: Block<PageBlocksContact>) {
	const { title, subtitle, openFormLabel, formTitle, formSubtitle } = props
	const t = useTranslations('contact')

	const [contactFormOpen, setContactFormOpen] = React.useState<boolean>(false)
	// const [bookingFormOpen, setBookingFormOpen] = React.useState<boolean>(false)

	return (
		<Section>
			<h1 className="sr-only">{t('title')}</h1>
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
				className="gap-lg flex flex-col items-center !overflow-visible md:flex-row"
			>
				<MagnetButton
					type="button"
					onClick={() => setContactFormOpen(true)}
					size="xl"
					className="motion-opacity-in-[0%] motion-delay-500 group w-full"
				>
					{openFormLabel}
					<ArrowRightIcon className="ml-md text-accent group-hover:translate-x-sm group-hover:text-inverted transition-all" />
				</MagnetButton>
				{/* <MagnetButton
					type="button"
					onClick={() => setBookingFormOpen(true)}
					variant="outline"
					className="group"
					size="xl"
				>
					<span className="flex items-center">
						<CalendarClockIcon className="group-hover:motion-preset-seesaw mr-md text-success size-6" />

						{t('cta.booking')}
					</span>
				</MagnetButton> */}
			</TextSlideUp>

			<Drawer
				repositionInputs={false}
				open={contactFormOpen}
				onOpenChange={setContactFormOpen}
			>
				<DrawerContent className="bg-primary max-h-[85vh]">
					<DrawerTitle className="sr-only">Contact</DrawerTitle>
					<div className="pb-xl container">
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
			{/* <DrawerDialog open={bookingFormOpen} onOpenChange={setBookingFormOpen}>
				<EmbeddedCal
					className="[&_iframe]:h-fit [&_iframe]:max-h-[85vh] [&_iframe]:overflow-y-scroll"
					bookingType="30min"
				/>
			</DrawerDialog> */}
		</Section>
	)
}

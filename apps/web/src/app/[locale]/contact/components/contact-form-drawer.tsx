'use client'

import {
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/design-system/components/section'
import {
	Drawer,
	DrawerContent,
	DrawerTitle,
} from '@repo/design-system/components/ui'
import { useTranslations } from '@repo/i18n/client'
import * as React from 'react'
import { ContactForm } from '../forms/contact-form'
import { HeroCTA } from '~/app/components/hero'

export function ContactFormViaButton() {
	const [contactFormOpen, setContactFormOpen] = React.useState<boolean>(false)
	const t = useTranslations('contact.page.form')

	return (
		<>
			<HeroCTA
				type="button"
				onClick={() => setContactFormOpen(true)}
				className="motion-opacity-in-[0%] motion-delay-500 group w-full"
			>
				{t('openFormLabel')}
			</HeroCTA>
			<Drawer
				repositionInputs={false}
				open={contactFormOpen}
				onOpenChange={setContactFormOpen}
			>
				<DrawerContent className="bg-background max-h-[85vh]">
					<DrawerTitle className="sr-only">{t('title')}</DrawerTitle>
					<div className="pb-xl container">
						<SectionHeader>
							<SectionHeaderTitle>{t('title')}</SectionHeaderTitle>
							<SectionHeaderSubtitle>{t('subtitle')}</SectionHeaderSubtitle>
						</SectionHeader>
						<ContactForm />
					</div>
				</DrawerContent>
			</Drawer>
		</>
	)
}

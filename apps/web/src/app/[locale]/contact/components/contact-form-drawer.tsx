'use client'

import { MagnetButton } from '@repo/design-system/components/magnet'
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
import { ArrowRightIcon } from '@repo/design-system/icons'
import { useTranslations } from '@repo/i18n/client'
import { useState } from 'react'
import { ContactForm } from '../forms/contact-form'

export function ContactFormViaButton() {
	const [contactFormOpen, setContactFormOpen] = useState<boolean>(false)
	const t = useTranslations('contact.page.form')

	return (
		<>
			<MagnetButton
				size="xl"
				className="mt-xl group flex items-center"
				onClick={() => setContactFormOpen(true)}
			>
				{t('openFormLabel')}
				<ArrowRightIcon className="text-brand ml-sm group-hover:translate-x-sm size-6 transition-all" />
			</MagnetButton>

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

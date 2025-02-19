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
import { ArrowRightIcon } from '@repo/design-system/lib/icons'
import { useTranslations } from '@repo/i18n/client'
import * as React from 'react'
import { ContactForm } from '../forms/contact-form'

export function ContactFormViaButton() {
	const [contactFormOpen, setContactFormOpen] = React.useState<boolean>(false)
	const t = useTranslations('contact.page.form')

	return (
		<>
			<MagnetButton
				type="button"
				onClick={() => setContactFormOpen(true)}
				size="xl"
				className="motion-opacity-in-[0%] motion-delay-500 group w-full"
			>
				{t('openFormLabel')}
				<ArrowRightIcon className="ml-md text-accent group-hover:translate-x-sm group-hover:text-inverted transition-all" />
			</MagnetButton>
			<Drawer
				repositionInputs={false}
				open={contactFormOpen}
				onOpenChange={setContactFormOpen}
			>
				<DrawerContent className="bg-primary max-h-[85vh]">
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

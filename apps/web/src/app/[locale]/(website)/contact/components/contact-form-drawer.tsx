'use client'

import { Button } from '@nerdfish/react/button'
import { Drawer, DrawerContent, DrawerTitle } from '@nerdfish/react/drawer'
import {
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/design-system/components/section'
import { useTranslations } from '@repo/i18n/client'
import { ArrowRightIcon } from 'lucide-react'
import { useState } from 'react'
import { ContactForm } from '../forms/contact-form'

export function ContactFormViaButton() {
	const [contactFormOpen, setContactFormOpen] = useState<boolean>(false)
	const t = useTranslations('contact.page.form')

	return (
		<>
			<Button
				size="xl"
				className="mt-acquaintances group flex items-center"
				onClick={() => setContactFormOpen(true)}
			>
				{t('openFormLabel')}
				<ArrowRightIcon className="text-inverted ml-best-friends group-hover:translate-x-sm size-6 transition-all" />
			</Button>

			<Drawer
				repositionInputs={false}
				open={contactFormOpen}
				onOpenChange={setContactFormOpen}
			>
				<DrawerContent className="bg-background max-h-[85vh]">
					<DrawerTitle className="sr-only">{t('title')}</DrawerTitle>
					<div className="pb-acquaintances container max-w-4xl">
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

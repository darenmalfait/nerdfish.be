'use client'

import { Drawer, DrawerContent, DrawerTitle } from '@nerdfish/react/drawer'
import { Skeleton } from '@nerdfish/react/skeleton'
import { MagnetButton } from '@repo/design-system/components/magnet'
import {
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/design-system/components/section'
import { useTranslations } from '@repo/i18n/client'
import { ArrowRightIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const ContactForm = dynamic(
	() => import('../forms/contact-form').then((mod) => mod.ContactForm),
	{
		ssr: false,
		loading: () => <Skeleton className="min-h-80 w-full" />,
	},
)

export function ContactFormViaButton() {
	const [contactFormOpen, setContactFormOpen] = useState<boolean>(false)
	const t = useTranslations('contact.page.form')

	return (
		<>
			<MagnetButton
				size="xl"
				className="mt-acquaintances group flex items-center"
				onClick={() => setContactFormOpen(true)}
			>
				{t('openFormLabel')}
				<ArrowRightIcon className="text-inverted ml-best-friends group-hover:translate-x-sm size-6 transition-all" />
			</MagnetButton>

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
						{contactFormOpen ? <ContactForm /> : null}
					</div>
				</DrawerContent>
			</Drawer>
		</>
	)
}

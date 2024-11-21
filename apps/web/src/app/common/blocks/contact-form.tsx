'use client'

import { Drawer, DrawerContent, DrawerTrigger } from '@nerdfish/ui'
import {
	Section,
	TextSlideUp,
	MagnetButton,
} from '@nerdfish-website/ui/components'
import { ArrowRightIcon } from '@nerdfish-website/ui/icons'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import {
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '../components'
import { ContactForm } from '~/app/[locale]/contact'
import { type PageBlocksContactForm, type Block } from '~/app/cms'

export function ContactFormBlock(props: Block<PageBlocksContactForm>) {
	const { title, subtitle, openFormLabel, formTitle, formSubtitle } = props

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
			<Drawer>
				<DrawerTrigger asChild>
					<TextSlideUp delay={400} className="!overflow-visible">
						<MagnetButton
							size="xl"
							className="motion-opacity-in-[0%] motion-delay-500"
						>
							{openFormLabel}
							<ArrowRightIcon className="ml-md text-accent group-hover:translate-x-xs group-hover:text-inverted transition-all" />
						</MagnetButton>
					</TextSlideUp>
				</DrawerTrigger>

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
		</Section>
	)
}

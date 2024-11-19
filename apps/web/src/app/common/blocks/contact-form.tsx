'use client'

import {
	Button,
	Drawer,
	DrawerContent,
	DrawerTrigger,
	ScrollArea,
} from '@nerdfish/ui'
import { Section } from '@nerdfish-website/ui/components'
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
				<DrawerTrigger
					asChild
					className="hover:motion-preset-seesaw motion-loop-once group inline-flex"
				>
					<Button size="xl">
						{openFormLabel}
						<ArrowRightIcon className="ml-md text-accent group-hover:translate-x-xs group-hover:text-inverted transition-all" />
					</Button>
				</DrawerTrigger>
				<DrawerContent className="p-lg bg-primary">
					<ScrollArea className="h-[80vh]">
						<div className="pb-xl container mx-auto">
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
					</ScrollArea>
				</DrawerContent>
			</Drawer>
		</Section>
	)
}

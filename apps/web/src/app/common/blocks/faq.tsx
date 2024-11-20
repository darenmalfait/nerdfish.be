'use client'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@nerdfish/ui'
import { Section } from '@nerdfish-website/ui/components'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import {
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '../components'
import { nonNullable } from '../utils'
import { type PageBlocksFaq, type Block } from '~/app/cms'

const BlockLayout = ({ children }: { children: React.ReactNode }) => {
	if (!children) return null

	return <Section>{children}</Section>
}

function QAItem({ question, answer }: { question: string; answer: string }) {
	const id = React.useId()

	return (
		<AccordionItem
			value={id}
			className="bg-muted px-md focus-within:outline-active py-sm hover:bg-muted/80 rounded-semi group border-none outline-none"
		>
			<AccordionTrigger className="text-xl !outline-none after:hidden hover:no-underline">
				{question}
			</AccordionTrigger>
			<AccordionContent className="text-primary text-lg">
				{answer}
			</AccordionContent>
		</AccordionItem>
	)
}

export function FAQBlock(props: Block<PageBlocksFaq>) {
	const { title, subtitle, qa } = props

	if (!qa?.length) return null

	return (
		<BlockLayout>
			<SectionHeader>
				<SectionHeaderTitle data-tina-field={tinaField(props, 'title')}>
					{title}
				</SectionHeaderTitle>
				<SectionHeaderSubtitle data-tina-field={tinaField(props, 'subtitle')}>
					{subtitle}
				</SectionHeaderSubtitle>
			</SectionHeader>
			<div className="relative">
				<Accordion type="single" className="space-y-md">
					{qa.filter(nonNullable).map((item) => (
						<QAItem
							question={item.question ?? ''}
							answer={item.answer ?? ''}
							key={item.question}
						/>
					))}
				</Accordion>
			</div>
		</BlockLayout>
	)
}

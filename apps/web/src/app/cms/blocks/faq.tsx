'use client'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	H3,
} from '@nerdfish/ui'
import { nonNullable } from '@nerdfish-website/lib/utils'
import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@nerdfish-website/ui/components'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
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
			className="p-lg focus-within:outline-active py-sm hover:bg-secondary rounded-container bg-muted group border-none outline-none transition-colors"
		>
			<AccordionTrigger className="py-lg !outline-none after:hidden hover:no-underline">
				<H3 variant="primary" as="span">
					{question}
				</H3>
			</AccordionTrigger>
			<AccordionContent className="pt-md prose prose-xl text-primary text-xl">
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
					{nonNullable(qa).map((item) => (
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

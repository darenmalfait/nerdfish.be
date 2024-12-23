'use client'

import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/design-system/components/section'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	H3,
} from '@repo/design-system/components/ui'
import { nonNullable } from '@repo/design-system/lib/utils/array'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { type Block, type PageBlocksFaq } from '~/app/cms/types'

const BlockLayout = ({ children }: { children: React.ReactNode }) => {
	if (!children) return null

	return <Section>{children}</Section>
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
	const id = React.useId()

	return (
		<AccordionItem
			value={id}
			className="rounded-container bg-muted p-lg py-sm focus-within:outline-active hover:bg-muted/50 group border-none outline-none transition-colors"
		>
			<AccordionTrigger className="py-lg !outline-none after:hidden hover:no-underline">
				<H3 variant="primary" as="span">
					{question}
				</H3>
			</AccordionTrigger>
			<AccordionContent className="prose prose-xl pt-md text-primary text-xl">
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
						<FAQItem
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

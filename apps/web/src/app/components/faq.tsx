'use client'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@repo/design-system/components/ui'
import { cx } from '@repo/lib/utils/base'
import * as React from 'react'

export interface FaqItemProps
	extends Omit<React.ComponentProps<typeof AccordionItem>, 'value'> {
	question: string
	answer: string
	icon?: React.ReactNode
	iconPosition?: 'left' | 'right'
}

export function FaqItem({
	question,
	answer,
	icon,
	id: idProp,
	iconPosition,
	...props
}: FaqItemProps) {
	const id = React.useId()

	return (
		<AccordionItem
			{...props}
			value={idProp ?? id}
			className="prose prose-xl mx-auto !border-transparent"
		>
			<AccordionTrigger
				className={cx(
					'gap-x-md py-sm flex w-full items-center justify-start !no-underline',
					'group',
				)}
			>
				<div
					className={cx(
						'bg-muted rounded-base space-x-sm p-md relative flex items-center text-lg transition-colors',
						'hover:bg-inverted/30',
						'group-data-[state=open]:bg-accent group-data-[state=open]:text-white',
					)}
				>
					{icon ? (
						<span
							className={cx(
								'absolute bottom-6',
								iconPosition === 'right' ? 'right-0' : 'left-0',
							)}
							style={{
								transform:
									iconPosition === 'right' ? 'rotate(7deg)' : 'rotate(-4deg)',
							}}
						>
							{icon}
						</span>
					) : null}
					<span className="font-medium">{question}</span>
				</div>
			</AccordionTrigger>
			<AccordionContent className="prose prose-xl text-foreground !pb-md max-w-none text-xl">
				<div className="ml-7 md:ml-16">
					<div
						className={cx(
							'bg-inverted text-inverted rounded-base p-md relative max-w-none',
						)}
					>
						{answer}
					</div>
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}

export type FaqProps = React.ComponentProps<typeof Accordion>

export function Faq({ className, children, ...props }: FaqProps) {
	return (
		<div className="relative">
			<Accordion {...props} className={cx('space-y-xs', className)}>
				{children}
			</Accordion>
		</div>
	)
}

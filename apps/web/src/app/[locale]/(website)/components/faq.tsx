'use client'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@nerdfish/react/accordion'
import { cn } from '@repo/lib/utils/class'
import { useId, type ComponentProps, type ReactNode } from 'react'

export interface FaqItemProps extends Omit<
	ComponentProps<typeof AccordionItem>,
	'value'
> {
	question: string
	answer: string
	icon?: ReactNode
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
	const id = useId()

	return (
		<AccordionItem
			{...props}
			value={idProp ?? id}
			className={cn(
				'group/accordion-item border-border bg-background-muted rounded-container mx-auto p-0!',
			)}
		>
			<AccordionTrigger className={cn('p-proximity-3!')}>
				<div className={cn('typography-title relative')}>
					{icon ? (
						<span
							className={cn(
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
			<AccordionContent className="typography text-foreground px-proximity-2! pb-friends! max-w-none pt-0">
				<div className={cn('typography-body-large relative max-w-none')}>
					{answer}
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}

export type FaqProps = ComponentProps<typeof Accordion>

export function Faq({ className, children, ...props }: FaqProps) {
	return (
		<div className="relative">
			<Accordion {...props} className={cn('space-y-bff', className)}>
				{children}
			</Accordion>
		</div>
	)
}

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
			className="typography group/accordion-item mx-auto border-transparent! focus-within:ring-0"
		>
			<AccordionTrigger
				className={cn(
					'gap-x-friends py-best-friends flex w-full items-center justify-start no-underline! hover:bg-transparent',
					'group/accordion-trigger',
				)}
			>
				<div
					className={cn(
						'group-focus-within/accordion-item:ring-ring group-focus-within/accordion-item:ring-[3px]',
						'bg-background-muted rounded-base space-x-sm p-friends relative flex items-center transition-colors',
						'hover:bg-background-inverted/10 text-foreground group-data-panel-open/accordion-trigger:hover:bg-accent/80',
						'group-data-panel-open/accordion-trigger:bg-accent group-data-panel-open/accordion-trigger:text-accent-contrast',
						'typography-body',
					)}
				>
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
			<AccordionContent className="typography text-foreground pb-friends! pt-friends max-w-none">
				<div className="ml-7 md:ml-16">
					<div
						className={cn(
							'bg-background-inverted text-foreground-inverted rounded-base p-friends typography-body relative max-w-none',
						)}
					>
						{answer}
					</div>
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

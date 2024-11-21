'use client'

import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Separator,
} from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import Link from 'next/link'
import * as React from 'react'
import { CheckIcon } from '../icons'

interface PriceCardContextProps {
	isPopular?: boolean
	price?: string
}

const PriceCardContext = React.createContext<PriceCardContextProps | null>(null)
PriceCardContext.displayName = 'PriceCardContext'

function usePriceCard(): PriceCardContextProps {
	const context = React.useContext(PriceCardContext)

	if (!context) {
		throw new Error('You should use usePriceCard within an PriceCardContext')
	}

	return context
}

export const PriceCardHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
	return (
		<CardHeader
			ref={ref}
			className={cx('bg-transparent', className)}
			{...props}
		>
			{children}
			<Separator />
		</CardHeader>
	)
})
PriceCardHeader.displayName = 'PriceCardHeader'

export const PriceCardTitle = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
	if (!children) return null

	return (
		<CardTitle ref={ref} {...props}>
			{children}
		</CardTitle>
	)
})
PriceCardTitle.displayName = 'PriceCardTitle'

export const PriceCardFeatures = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
	const { isPopular } = usePriceCard()
	return (
		<CardContent
			ref={ref}
			className={cx(
				{
					'dark:light dark': isPopular,
				},
				className,
			)}
			{...props}
		>
			<ul>{children}</ul>
		</CardContent>
	)
})
PriceCardFeatures.displayName = 'PriceCardFeatures'

export const PriceCardFeature = React.forwardRef<
	HTMLLIElement,
	React.HTMLAttributes<HTMLLIElement>
>(({ children, className, ...props }, ref) => {
	return (
		<li
			ref={ref}
			className={cx('gap-sm flex items-center', className)}
			{...props}
		>
			<CheckIcon className="text-success size-3" />
			<span className="font-medium">{children}</span>
		</li>
	)
})

PriceCardFeature.displayName = 'PriceCardFeature'

export const PriceCardDescription = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
	const { isPopular } = usePriceCard()
	if (!children) return null
	return (
		<CardDescription
			ref={ref}
			className={cx(
				'text-muted text-lg',
				{
					'text-inverted/60': isPopular,
				},
				className,
			)}
			{...props}
		>
			{children}
		</CardDescription>
	)
})
PriceCardDescription.displayName = 'PriceCardDescription'

export const PriceCardPrice = React.forwardRef<
	HTMLParagraphElement,
	Omit<React.HTMLAttributes<HTMLParagraphElement>, 'children'>
>(({ className, ...props }, ref) => {
	const { price } = usePriceCard()

	if (!price) return null

	return (
		<p ref={ref} className={cx('p-md', className)} {...props}>
			<span className="inline text-4xl font-semibold leading-7 tracking-tight">
				{price}
			</span>
		</p>
	)
})
PriceCardPrice.displayName = 'PriceCardPrice'

export const PriceCardAction = React.forwardRef<
	React.ElementRef<typeof Link>,
	React.ComponentPropsWithoutRef<typeof Link>
>(({ children, href, ...props }, ref) => {
	const { isPopular } = usePriceCard()

	return (
		<CardFooter className="mt-lg flex-1 items-end">
			<Button
				size="lg"
				className="w-full"
				variant={isPopular ? 'accent' : 'default'}
				asChild
			>
				<Link ref={ref} href={href} {...props}>
					{children}
				</Link>
			</Button>
		</CardFooter>
	)
})
PriceCardAction.displayName = 'PriceCardAction'

export const PriceCard = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & { isPopular?: boolean; price?: string }
>(({ children, isPopular, price, className, ...props }, ref) => {
	return (
		<PriceCardContext.Provider
			value={React.useMemo(() => ({ isPopular, price }), [isPopular, price])}
		>
			<Card
				ref={ref}
				className={cx(
					'p-lg',
					{
						'bg-inverted text-inverted': isPopular,
						'bg-secondary': !isPopular,
					},
					className,
				)}
				{...props}
			>
				{children}
			</Card>
		</PriceCardContext.Provider>
	)
})
PriceCard.displayName = 'PriceCard'

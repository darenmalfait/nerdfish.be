'use client'

import { Button } from '@nerdfish/react/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@nerdfish/react/card'
import { Separator } from '@nerdfish/react/separator'
import { cn } from '@repo/lib/utils/class'
import Link from 'next/link'
import {
	type ComponentProps,
	createContext,
	type ElementType,
	useContext,
	useMemo,
} from 'react'
import { CheckIcon } from '../icons'

interface PriceCardContextProps {
	isPopular?: boolean
	price?: string
}

const PriceCardContext = createContext<PriceCardContextProps | null>(null)
PriceCardContext.displayName = 'PriceCardContext'

function usePriceCard(): PriceCardContextProps {
	const context = useContext(PriceCardContext)

	if (!context) {
		throw new Error('You should use usePriceCard within an PriceCardContext')
	}

	return context
}

export type PriceCardHeaderProps = ComponentProps<'div'>

export function PriceCardHeader({
	children,
	className,
	...props
}: PriceCardHeaderProps) {
	const { isPopular } = usePriceCard()
	return (
		<CardHeader className={cn('bg-transparent', className)} {...props}>
			{children}
			<Separator
				className={cn('my-best-friends', {
					'bg-background/20': isPopular,
				})}
			/>
		</CardHeader>
	)
}

export type PriceCardTitleProps = ComponentProps<typeof CardTitle>

export function PriceCardTitle({ children, ...props }: PriceCardTitleProps) {
	if (!children) return null

	return <CardTitle {...props}>{children}</CardTitle>
}

export type PriceCardFeaturesProps = ComponentProps<typeof CardContent>

export function PriceCardFeatures({
	children,
	className,
	...props
}: PriceCardFeaturesProps) {
	const { isPopular } = usePriceCard()
	return (
		<CardContent
			className={cn(
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
}

export type PriceCardFeatureProps = ComponentProps<'li'>

export function PriceCardFeature({
	children,
	className,
	...props
}: PriceCardFeatureProps) {
	return (
		<li
			className={cn('gap-best-friends flex items-center', className)}
			{...props}
		>
			<CheckIcon className="text-success-foreground size-3" />
			<span className="font-medium">{children}</span>
		</li>
	)
}

export type PriceCardDescriptionProps = ComponentProps<typeof CardDescription>

export function PriceCardDescription({
	children,
	className,
	...props
}: PriceCardDescriptionProps) {
	const { isPopular } = usePriceCard()
	if (!children) return null

	return (
		<CardDescription
			className={cn(
				'text-foreground-muted text-lg',
				{
					'text-foreground-inverted/80': isPopular,
				},
				className,
			)}
			{...props}
		>
			{children}
		</CardDescription>
	)
}

export type PriceCardPriceProps = ComponentProps<'p'>

export function PriceCardPrice({
	children,
	className,
	...props
}: PriceCardPriceProps) {
	const { price } = usePriceCard()

	if (!price) return null

	return (
		<p className={cn('p-friends', className)} {...props}>
			<span className="inline text-4xl leading-7 font-semibold">{price}</span>
		</p>
	)
}

export type PriceCardActionProps = ComponentProps<typeof Link> & {
	as?: ElementType
}

export function PriceCardAction({
	children,
	href,
	as,
	...props
}: PriceCardActionProps) {
	const { isPopular } = usePriceCard()

	const LinkElement = as ?? Link

	return (
		<CardFooter className="mt-casual flex-1 items-end">
			<Button
				size="lg"
				className="w-full"
				variant={isPopular ? 'accent' : 'default'}
				render={
					<LinkElement href={href} {...props}>
						{children}
					</LinkElement>
				}
			/>
		</CardFooter>
	)
}

export interface PriceCardProps extends ComponentProps<typeof Card> {
	isPopular?: boolean
	price?: string
}

export function PriceCard({
	children,
	isPopular,
	price,
	className,
	...props
}: PriceCardProps) {
	return (
		<PriceCardContext
			value={useMemo(() => ({ isPopular, price }), [isPopular, price])}
		>
			<Card
				className={cn(
					{
						'bg-background-inverted text-foreground-inverted': isPopular,
						'bg-background-muted': !isPopular,
					},
					className,
				)}
				{...props}
			>
				{children}
			</Card>
		</PriceCardContext>
	)
}

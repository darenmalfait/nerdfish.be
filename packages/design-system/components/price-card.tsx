'use client'

import { cx } from '@repo/lib/utils/base'
import Link from 'next/link'
import * as React from 'react'
import { CheckIcon } from '../icons'
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	H3,
	Separator,
} from './ui'

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

export type PriceCardHeaderProps = React.ComponentProps<'div'>

export function PriceCardHeader({
	children,
	className,
	...props
}: PriceCardHeaderProps) {
	return (
		<CardHeader className={cx('bg-transparent', className)} {...props}>
			{children}
			<Separator />
		</CardHeader>
	)
}

export type PriceCardTitleProps = React.ComponentProps<typeof CardTitle>

export function PriceCardTitle({ children, ...props }: PriceCardTitleProps) {
	if (!children) return null

	return <CardTitle {...props}>{children}</CardTitle>
}

export type PriceCardFeaturesProps = React.ComponentProps<typeof CardContent>

export function PriceCardFeatures({
	children,
	className,
	...props
}: PriceCardFeaturesProps) {
	const { isPopular } = usePriceCard()
	return (
		<CardContent
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
}

export type PriceCardFeatureProps = React.ComponentProps<'li'>

export function PriceCardFeature({
	children,
	className,
	...props
}: PriceCardFeatureProps) {
	return (
		<li className={cx('gap-sm flex items-center', className)} {...props}>
			<CheckIcon className="text-success size-3" />
			<span className="font-medium">{children}</span>
		</li>
	)
}

export type PriceCardDescriptionProps = React.ComponentProps<
	typeof CardDescription
>

export function PriceCardDescription({
	children,
	className,
	...props
}: PriceCardDescriptionProps) {
	const { isPopular } = usePriceCard()
	if (!children) return null

	return (
		<CardDescription
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
}

export type PriceCardPriceProps = React.ComponentProps<typeof H3>

export function PriceCardPrice({
	children,
	className,
	...props
}: PriceCardPriceProps) {
	const { price } = usePriceCard()

	if (!price) return null

	return (
		<p className={cx('p-md', className)} {...props}>
			<H3 as="span" className="inline text-4xl font-semibold leading-7">
				{price}
			</H3>
		</p>
	)
}

export type PriceCardActionProps = React.ComponentProps<typeof Link> & {
	as?: React.ElementType
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
		<CardFooter className="mt-lg flex-1 items-end">
			<Button
				size="lg"
				className="w-full"
				variant={isPopular ? 'accent' : 'default'}
				asChild
			>
				<LinkElement href={href} {...props}>
					{children}
				</LinkElement>
			</Button>
		</CardFooter>
	)
}

export interface PriceCardProps extends React.ComponentProps<typeof Card> {
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
		<PriceCardContext value={{ isPopular, price }}>
			<Card
				className={cx(
					'p-md',
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
		</PriceCardContext>
	)
}

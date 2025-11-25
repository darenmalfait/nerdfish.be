'use client'

import {
	PriceCard,
	PriceCardAction,
	PriceCardDescription,
	PriceCardFeature,
	PriceCardFeatures,
	PriceCardHeader,
	type PriceCardProps,
	PriceCardTitle,
} from '@repo/design-system/components/price-card'
import { useTranslations } from '@repo/i18n/client'
import { cn } from '@repo/lib/utils/class'
import type * as React from 'react'
import { Link } from './link'

interface Price extends PriceCardProps {
	description: string
	features?: string[]
	href?: string
	buttonText?: string
}

export interface PricingProps {
	plans: Price[]
}

export function Pricing(props: PricingProps) {
	const { plans } = props
	const t = useTranslations('global')

	if (!plans.length) return null

	return (
		<>
			<div
				className={cn('grid grid-cols-1 gap-4 md:grid-cols-2', {
					'lg:grid-cols-3': plans.length > 2,
				})}
			>
				{plans.map((item) => (
					<PriceCard
						isPopular={item.isPopular ?? false}
						key={item.title}
						price={item.price ?? undefined}
					>
						<PriceCardHeader>
							<PriceCardTitle>{item.title}</PriceCardTitle>
							<PriceCardDescription>{item.description}</PriceCardDescription>
						</PriceCardHeader>
						<PriceCardFeatures>
							{item.features?.map((feature) => (
								<PriceCardFeature key={feature}>{feature}</PriceCardFeature>
							))}
						</PriceCardFeatures>
						<PriceCardAction as={Link} href={item.href ?? ''}>
							{item.buttonText}
						</PriceCardAction>
					</PriceCard>
				))}
			</div>
			<p className="mt-friends text-foreground-muted text-center text-sm">
				{t('vat')}
			</p>
		</>
	)
}

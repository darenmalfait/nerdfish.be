'use client'

import { cx } from '@nerdfish/utils'
import {
	PriceCard,
	PriceCardAction,
	PriceCardDescription,
	PriceCardFeature,
	PriceCardFeatures,
	PriceCardHeader,
	PriceCardTitle,
} from '@repo/design-system/components/price-card'
import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/design-system/components/section'
import { nonNullable } from '@repo/design-system/lib/utils/array'
import { useTranslations } from '@repo/i18n/client'
import type * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { type PageBlocksPricing } from '~/app/cms/types'

const BlockLayout = ({ children }: { children: React.ReactNode }) => {
	if (!children) return null

	return <Section>{children}</Section>
}

export function PricingBlock(props: PageBlocksPricing) {
	const { title, subtitle, price } = props
	const t = useTranslations('global')

	const prices = nonNullable(price ?? [])

	if (!prices.length) return null

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
			<div
				className={cx('grid grid-cols-1 gap-4 md:grid-cols-2', {
					'lg:grid-cols-3': prices.length > 2,
				})}
			>
				{prices.map((item) => (
					<PriceCard
						isPopular={item.featured ?? false}
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
						<PriceCardAction href={item.link ?? ''}>
							{item.buttonText}
						</PriceCardAction>
					</PriceCard>
				))}
			</div>
			<p className="mt-sm text-primary text-center text-sm">{t('vat')}</p>
		</BlockLayout>
	)
}

'use client'

import { cx } from '@nerdfish/utils'
import { nonNullable } from '@nerdfish-website/lib/utils'
import {
	Section,
	PriceCard,
	PriceCardHeader,
	PriceCardTitle,
	PriceCardDescription,
	PriceCardFeatures,
	PriceCardFeature,
	PriceCardAction,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@nerdfish-website/ui/components'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { type PageBlocksPricing, type Block } from '~/app/cms'
import { useTranslation } from '~/app/i18n'

const BlockLayout = ({ children }: { children: React.ReactNode }) => {
	if (!children) return null

	return <Section>{children}</Section>
}

export function PricingBlock(props: Block<PageBlocksPricing>) {
	const { title, subtitle, price } = props
	const { t } = useTranslation()

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
			<p className="text-primary mt-sm text-center text-sm">
				{t('global.vat')}
			</p>
		</BlockLayout>
	)
}

'use client'

import {
	Section,
	PriceCard,
	PriceCardHeader,
	PriceCardTitle,
	PriceCardDescription,
	PriceCardFeatures,
	PriceCardFeature,
	PriceCardAction,
} from '@nerdfish-website/ui/components'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import {
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '../components'

import { nonNullable } from '../utils'
import { type PageBlocksPricing, type Block } from '~/app/cms'

const BlockLayout = ({ children }: { children: React.ReactNode }) => {
	if (!children) return null

	return <Section className="bg-muted px-xl">{children}</Section>
}

export function PricingBlock(props: Block<PageBlocksPricing>) {
	const { title, subtitle, price } = props

	if (!price?.length) return null
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
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{price.filter(nonNullable).map((item) => (
					<PriceCard key={item.title} price={item.price ?? undefined}>
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
		</BlockLayout>
	)
}

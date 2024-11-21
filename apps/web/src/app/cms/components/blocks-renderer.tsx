import * as React from 'react'
import { type Block } from '../types'
import { BlogOverviewBlock } from '~/app/[locale]/blog'
import { BookingBlock } from '~/app/[locale]/contact'
import { ProductsBlock } from '~/app/[locale]/realisations'
import { WikiOverviewBlock } from '~/app/[locale]/wiki'
import { WorkOverviewBlock } from '~/app/[locale]/work'
import {
	ContentBlock,
	FeaturesBlock,
	HeroBlock,
	KeywordListBlock,
	NeonBlock,
	SkillsBlock,
} from '~/app/common'
import { ContactFormBlock } from '~/app/common/blocks/contact-form'
import { CtaBlock } from '~/app/common/blocks/cta'
import { FAQBlock } from '~/app/common/blocks/faq'
import { HighlightBlock } from '~/app/common/blocks/highlight'
import { ImageGridBlock } from '~/app/common/blocks/image-grid'
import { PricingBlock } from '~/app/common/blocks/pricing'
import { TestimonialsBlock } from '~/app/common/blocks/testimonials'
import { type WorkBlocks, type PageBlocks } from '~/tina/__generated__/types'

type PageBlockType =
	| NonNullable<PageBlocks[keyof PageBlocks]>
	| NonNullable<WorkBlocks[keyof WorkBlocks]>

const getComponent = (componentKey: string) => {
	// Not putting this outside, because of server rendering
	// [key] is the name of the module in TinaCMS
	const componentsMap: {
		[K in PageBlockType]: React.ComponentType<Block>
	} = {
		// Page blocks
		PageBlocksBlog: BlogOverviewBlock,
		PageBlocksBooking: BookingBlock,
		PageBlocksContactForm: ContactFormBlock,
		PageBlocksContent: ContentBlock,
		PageBlocksCta: CtaBlock,
		PageBlocksFaq: FAQBlock,
		PageBlocksFeatures: FeaturesBlock,
		PageBlocksHero: HeroBlock,
		PageBlocksHighlight: HighlightBlock,
		PageBlocksImageGrid: ImageGridBlock,
		PageBlocksKeywordList: KeywordListBlock,
		PageBlocksNeon: NeonBlock,
		PageBlocksPricing: PricingBlock,
		PageBlocksProducts: ProductsBlock,
		PageBlocksSkills: SkillsBlock,
		PageBlocksTestimonials: TestimonialsBlock,
		PageBlocksWiki: WikiOverviewBlock,
		PageBlocksWork: WorkOverviewBlock,
		WorkBlocksContent: ContentBlock,

		// Work blocks
		WorkBlocksImageGrid: ImageGridBlock,
		WorkBlocksTestimonials: TestimonialsBlock,
	} as const

	if (!Object.keys(componentsMap).includes(componentKey)) {
		return false
	}
	// Should be safe, as we check for the existence of the key in the previous if
	return componentsMap[componentKey as keyof typeof componentsMap]
}

function Placeholder({
	componentName = 'unknown component',
}: {
	componentName?: string | number
}) {
	return (
		<section className="border-danger bg-danger-muted border py-4 text-center">
			<p className="text-danger mx-auto text-center">
				The component <strong>{componentName}</strong> has not been created yet.
			</p>
		</section>
	)
}

function BlockComponent({
	block,
	globalData,
	locale,
}: {
	block: PageBlocks
	globalData?: Block['globalData']
	locale?: Block['locale']
}) {
	if (!block.__typename) return null

	const Component = getComponent(block.__typename)

	if (!Component) return <Placeholder componentName={block.__typename} />
	return <Component locale={locale} globalData={globalData} {...block} />
}

export function Blocks({
	items,
	globalData,
	locale,
}: {
	items?: any[] | null
	globalData?: Block['globalData']
	locale?: Block['locale']
}) {
	if (!items) return null

	return (
		<>
			{items.map((block, i) => {
				return (
					<BlockComponent
						key={i}
						// TODO: find a better way to type this
						block={block}
						locale={locale}
						globalData={globalData}
					/>
				)
			})}
		</>
	)
}

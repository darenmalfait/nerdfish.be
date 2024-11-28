import type * as React from 'react'
import { BlogOverviewBlock } from '~/app/[locale]/blog'
import {
	BookingBlock,
	ChatbotBlock,
	ContactBlock,
} from '~/app/[locale]/contact'
import { ProductsBlock } from '~/app/[locale]/realisations'
import { WikiOverviewBlock } from '~/app/[locale]/wiki'
import { WorkOverviewBlock } from '~/app/[locale]/work'
import type { PageBlocks, WorkBlocks } from '~/tina/__generated__/types'
import {
	ContentBlock,
	CtaBlock,
	FAQBlock,
	FeaturesBlock,
	HeroBlock,
	HighlightBlock,
	ImageGridBlock,
	KeywordListBlock,
	NeonBlock,
	PricingBlock,
	SkillsBlock,
	SplitWithImageBlock,
	TestimonialsBlock,
} from './blocks'
import type { Block } from './types'

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
		PageBlocksChatbot: ChatbotBlock,
		PageBlocksContact: ContactBlock,
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
		PageBlocksSplitWithImage: SplitWithImageBlock,

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
		<section className="border border-danger bg-danger-muted py-4 text-center">
			<p className="mx-auto text-center text-danger">
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
	// biome-ignore lint/suspicious/noExplicitAny: Can be PageBlocks or WorkBlocks, but don't know how to type it
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
						// biome-ignore lint/suspicious/noArrayIndexKey: no other real option
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

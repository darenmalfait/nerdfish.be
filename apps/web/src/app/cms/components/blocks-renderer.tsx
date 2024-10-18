import * as React from 'react'

import { type Block } from '../types'
import { BlogOverviewBlock } from '~/app/blog'
import {
	ContentBlock,
	FeaturesBlock,
	HeroBlock,
	HighlightBlock,
	KeywordListBlock,
	SkillsBlock,
} from '~/app/common'
import { BookingBlock } from '~/app/common/blocks/booking'
import { HighlightsBlock } from '~/app/common/blocks/highlights'
import { TextRevealBlock } from '~/app/common/blocks/text-reveal'
import { ProductsBlock } from '~/app/realisations'
import { WikiOverviewBlock } from '~/app/wiki'
import { WorkOverviewBlock } from '~/app/work'
import { type PageBlocks } from '~/tina/__generated__/types'

const FALLBACK_COMPONENT_ENABLED = process.env.NODE_ENV === 'development'

const getComponent = (componentKey: string) => {
	// Not putting this outside, because of server rendering
	// [key] is the name of the module in TinaCMS
	const componentsMap: {
		[K in PageBlockType]: React.ComponentType<Block>
	} = {
		PageBlocksBlog: BlogOverviewBlock,
		PageBlocksBooking: BookingBlock,
		PageBlocksContent: ContentBlock,
		PageBlocksFeatures: FeaturesBlock,
		PageBlocksHero: HeroBlock,
		PageBlocksHighlight: HighlightBlock,
		PageBlocksHighlights: HighlightsBlock,
		PageBlocksKeywordList: KeywordListBlock,
		PageBlocksProducts: ProductsBlock,
		PageBlocksSkills: SkillsBlock,
		PageBlocksTextReveal: TextRevealBlock,
		PageBlocksWiki: WikiOverviewBlock,
		PageBlocksWork: WorkOverviewBlock,
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

type PageBlockType = NonNullable<PageBlocks[keyof PageBlocks]>

function BlockComponent({
	block,
	globalData,
}: {
	block: PageBlocks
	globalData?: Block['globalData']
}) {
	if (!block.__typename) return null

	const Component = getComponent(block.__typename)

	if (!Component) {
		return FALLBACK_COMPONENT_ENABLED ? (
			<Placeholder componentName={block.__typename} />
		) : null
	}

	return <Component {...block} globalData={globalData} />
}

export function Blocks({
	items,
	globalData,
}: {
	items?: PageBlocks[] | null
	globalData?: Block['globalData']
}) {
	if (!items) return null

	return (
		<>
			{items.map((block, i) => {
				return <BlockComponent key={i} block={block} globalData={globalData} />
			})}
		</>
	)
}

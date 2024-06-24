import * as React from 'react'

import {BlogOverviewBlock} from '~/app/blog'
import {
  ContentBlock,
  FeaturesBlock,
  HeroBlock,
  KeywordListBlock,
} from '~/app/common'
import {HighlightsBlock} from '~/app/common/blocks/highlights'
import {ProductsBlock} from '~/app/realisations'
import {WikiOverviewBlock} from '~/app/wiki'
import {WorkOverviewBlock} from '~/app/work'
import {type PageBlocks} from '~/tina/__generated__/types'

import {type Block} from '../types'

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

type PageBlockType = NonNullable<PageBlocks[keyof PageBlocks]>

export function Blocks({
  items,
  globalData,
}: {
  items?: PageBlocks[] | null
  globalData?: Block['globalData']
}) {
  if (!items) return null

  // Not putting this outside, because of server rendering
  // [key] is the name of the module in TinaCMS
  const components: {
    [K in PageBlockType]: React.ComponentType<Block>
  } = {
    PageBlocksBlog: BlogOverviewBlock,
    PageBlocksContent: ContentBlock,
    PageBlocksFeatures: FeaturesBlock,
    PageBlocksHero: HeroBlock,
    PageBlocksHighlights: HighlightsBlock,
    PageBlocksKeywordList: KeywordListBlock,
    PageBlocksProducts: ProductsBlock,
    PageBlocksWiki: WikiOverviewBlock,
    PageBlocksWork: WorkOverviewBlock,
  }

  return (
    <>
      {items.map((block, i) => {
        if (
          !block.__typename ||
          !Object.keys(components).includes(block.__typename)
        ) {
          return (
            <Placeholder
              key={i.toString() + block.__typename}
              componentName={block.__typename}
            />
          )
        }

        const Component = components[block.__typename]

        return (
          <div data-tinafield={`blocks.${i}`} key={i + block.__typename}>
            <Component {...block} globalData={globalData} />
          </div>
        )
      })}
    </>
  )
}

'use client'

import * as React from 'react'
import {Section} from '@nerdfish/ui'
import {tinaField} from 'tinacms/dist/react'

import {BlogOverviewBlock} from '~/app/blog'
import {
  BigTitleBlock,
  ContentBlock,
  FeaturesBlock,
  HeroBlock,
  KeywordListBlock,
} from '~/app/common'
import {ProductsBlock} from '~/app/realisations'
import {WikiOverviewBlock} from '~/app/wiki'

import {type Block} from '../types'

function Placeholder({componentName}: {componentName: string | number}) {
  return (
    <Section className="border border-danger bg-danger-muted py-4 text-center">
      <p className="mx-auto text-center text-danger">
        The component <strong>{componentName}</strong> has not been created yet.
      </p>
    </Section>
  )
}

// [key] is the name of the module in TinaCMS
const components = {
  PageBlocksBigTitle: BigTitleBlock,
  PageBlocksBlog: BlogOverviewBlock,
  PageBlocksContent: ContentBlock,
  PageBlocksFeatures: FeaturesBlock,
  PageBlocksHero: HeroBlock,
  PageBlocksKeywordList: KeywordListBlock,
  PageBlocksProducts: ProductsBlock,
  PageBlocksWiki: WikiOverviewBlock,
}

type PropsOf<T> = T extends React.ComponentType<infer Props> ? Props : never

type BlockProps<T> = {
  __typename: T
}

export function Blocks<T extends keyof typeof components>({
  items,
  globalData,
}: {
  items?: (BlockProps<T> & PropsOf<(typeof components)[T]>)[]
  globalData?: Block['globalData']
}) {
  return (
    <>
      {(items ?? []).map((block, i) => {
        const Component = components[block.__typename]

        if (typeof Component !== 'undefined') {
          return (
            <div
              key={i.toString() + block.__typename}
              data-tina-field={tinaField(block)}
            >
              <Component {...(block as any)} globalData={globalData} />
            </div>
          )
        }

        return (
          <Placeholder
            key={i.toString() + block.__typename}
            componentName={block.__typename}
          />
        )
      })}
    </>
  )
}

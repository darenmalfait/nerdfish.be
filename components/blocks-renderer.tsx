import * as React from 'react'
import {tinaField} from 'tinacms/dist/react'

import {BigTitle} from './blocks/big-title'
import {Blog} from './blocks/blog'
import {Content} from './blocks/content'
import {Features} from './blocks/features'
import {Hero} from './blocks/hero'
import {KeywordList} from './blocks/keyword-list'
import {Products} from './blocks/products'
import {Wiki} from './blocks/wiki'
import {Placeholder} from './common/placeholder'

// [key] is the name of the module in TinaCMS
const components = {
  PageBlocksBigTitle: BigTitle,
  PageBlocksBlog: Blog,
  PageBlocksContent: Content,
  PageBlocksFeatures: Features,
  PageBlocksHero: Hero,
  PageBlocksKeywordList: KeywordList,
  PageBlocksProducts: Products,
  PageBlocksWiki: Wiki,
}

type PropsOf<T> = T extends React.ComponentType<infer Props> ? Props : never

type BlockProps<T> = {
  __typename: T
}

function Blocks<T extends keyof typeof components>({
  items,
}: {
  items?: (BlockProps<T> & PropsOf<(typeof components)[T]>)[]
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
              <Component {...(block as any)} />
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

export {Blocks}

import * as React from 'react'
import {Section} from '@nerdfish/ui'
import {tinaField} from 'tinacms/dist/react'

import {Block} from '~/lib/types/cms'

import {BigTitle} from './big-title'
import {Blog} from './blog'
import {Content} from './content'
import {Features} from './features'
import {Hero} from './hero'
import {KeywordList} from './keyword-list'
import {Products} from './products'
import {Wiki} from './wiki'

function Placeholder({componentName}: {componentName: string | number}) {
  return (
    <Section className="border border-red-200 bg-red-100 py-4 text-center">
      <p className="mx-auto text-center text-red-700">
        The component <strong>{componentName}</strong> has not been created yet.
      </p>
    </Section>
  )
}

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

export {Blocks}

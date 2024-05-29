import * as React from 'react'

import {Blocks, type ContentQueryQuery, type PageBlocks} from '~/app/cms'

import {mapPageData} from '../api'

export function PageContent({data}: {data: ContentQueryQuery}) {
  return (
    <Blocks
      items={data.page.blocks as PageBlocks[]}
      globalData={{...mapPageData(data)}}
    />
  )
}

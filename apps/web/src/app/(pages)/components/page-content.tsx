import * as React from 'react'

import {Blocks, ContentQueryQuery} from '~/app/cms'

import {mapPageData} from '../api'

function PageContent({data}: {data: ContentQueryQuery}) {
  return (
    <Blocks
      items={data.page.blocks as any}
      globalData={{...mapPageData(data)}}
    />
  )
}

export {PageContent}

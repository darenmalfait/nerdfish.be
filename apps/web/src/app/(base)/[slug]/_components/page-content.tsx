import * as React from 'react'

import {Blocks} from '~/components/blocks/blocks-renderer'
import {mapPageData} from '~/lib/api/cms'
import {type ContentQueryQuery} from '~/tina/__generated__/types'

function PageContent({data}: {data: ContentQueryQuery}) {
  return (
    <Blocks
      items={data.page.blocks as any}
      globalData={{...mapPageData(data)}}
    />
  )
}

export {PageContent}

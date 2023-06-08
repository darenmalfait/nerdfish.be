import * as React from 'react'

import {Blocks} from '~/components/blocks-renderer'
import {mapPageData} from '~/lib/services/api'
import {type ContentQueryQuery} from '~/tina/__generated__/types'

function PageTemplate({data}: {data: ContentQueryQuery}) {
  return (
    <Blocks
      items={data.page.blocks as any}
      globalData={{...mapPageData(data)}}
    />
  )
}

export {PageTemplate}

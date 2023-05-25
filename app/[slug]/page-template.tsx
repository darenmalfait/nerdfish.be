import * as React from 'react'

import {Blocks} from '~/components/blocks-renderer'
import {BlockDataProvider} from '~/context/block-data-provider'
import {mapPageData} from '~/lib/services/api'
import {type ContentQueryQuery} from '~/tina/__generated__/types'

function PageTemplate({data}: {data: ContentQueryQuery}) {
  return (
    <BlockDataProvider {...mapPageData(data)}>
      <Blocks items={data.page.blocks as any} />
    </BlockDataProvider>
  )
}

export {PageTemplate}

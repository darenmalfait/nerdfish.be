'use client'

import * as React from 'react'
import {useTina} from 'tinacms/dist/react'

import type {
  ContentQueryQuery,
  ContentQueryQueryVariables,
} from '~/.tina/__generated__/types'
import {Blocks} from '~/components/blocks-renderer'
import {Layout} from '~/components/layout/layout'
import {BlockDataProvider} from '~/context/block-data-provider'
import {mapPageData} from '~/lib/services/api'

function DefaultPage(props: {
  data: ContentQueryQuery
  query: string
  variables: ContentQueryQueryVariables
}) {
  const {data} = useTina<ContentQueryQuery>({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

  return (
    <Layout globalData={data.global}>
      <BlockDataProvider {...mapPageData(data)}>
        <Blocks items={data.page.blocks as any} />
      </BlockDataProvider>
    </Layout>
  )
}

export {DefaultPage}

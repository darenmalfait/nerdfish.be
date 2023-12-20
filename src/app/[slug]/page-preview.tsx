'use client'

import * as React from 'react'
import {useTina} from 'tinacms/dist/react'

import {Preview} from '~/components/misc/preview'
import {
  type ContentQueryQuery,
  type ContentQueryQueryVariables,
} from '~/tina/__generated__/types'

import {PageTemplate} from './page-template'

function PagePreview(props: {
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
    <>
      <Preview />
      <PageTemplate data={data} />
    </>
  )
}

export {PagePreview}

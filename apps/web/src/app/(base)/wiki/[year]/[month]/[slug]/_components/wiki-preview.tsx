'use client'

import * as React from 'react'
import {useTina} from 'tinacms/dist/react'

import {Preview} from '~/app/(base)/_components/preview'
import {WikiQueryQuery, WikiQueryVariables} from '~/tina/__generated__/types'

import {WikiContent} from './wiki-content'

function WikiPreview(props: {
  data: WikiQueryQuery
  query: string
  variables: WikiQueryVariables
}) {
  const {data} = useTina<WikiQueryQuery>({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

  return (
    <>
      <Preview />
      <WikiContent data={data} />
    </>
  )
}

export {WikiPreview}

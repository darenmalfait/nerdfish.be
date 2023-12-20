'use client'

import * as React from 'react'
import {useTina} from 'tinacms/dist/react'

import {Preview} from '~/components/misc/preview'
import {WikiQueryQuery, WikiQueryVariables} from '~/tina/__generated__/types'

import {WikiTemplate} from './wiki-template'

function WikiPreview(props: {
  data: WikiQueryQuery
  query: string
  variables: WikiQueryVariables
  wikiPath?: string | null
}) {
  const {data} = useTina<WikiQueryQuery>({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

  return (
    <>
      <Preview />
      <WikiTemplate wikiPath={props.wikiPath} data={data} />
    </>
  )
}

export {WikiPreview}

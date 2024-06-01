'use client'

import * as React from 'react'
import {useTina} from 'tinacms/dist/react'

import {type WorkQueryQuery, type WorkQueryVariables} from '~/app/cms'
import {Preview} from '~/app/cms/components'

import {WorkContent} from './work-content'

function WorkPreview(props: {
  data: WorkQueryQuery
  query: string
  variables: WorkQueryVariables
}) {
  const {data} = useTina<WorkQueryQuery>({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

  return (
    <>
      <Preview />
      <WorkContent data={data} />
    </>
  )
}

export {WorkPreview}

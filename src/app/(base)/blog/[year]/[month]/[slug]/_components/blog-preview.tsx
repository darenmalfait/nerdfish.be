'use client'

import * as React from 'react'
import {useTina} from 'tinacms/dist/react'

import {Preview} from '~/app/(base)/_components/preview'
import {
  BlogPostQueryQuery,
  BlogQueryVariables,
} from '~/tina/__generated__/types'

import {BlogContent} from './blog-content'

function BlogPreview(props: {
  data: BlogPostQueryQuery
  query: string
  variables: BlogQueryVariables
}) {
  const {data} = useTina<BlogPostQueryQuery>({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

  return (
    <>
      <Preview />
      <BlogContent data={data} />
    </>
  )
}

export {BlogPreview}

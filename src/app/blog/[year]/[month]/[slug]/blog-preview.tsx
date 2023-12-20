'use client'

import * as React from 'react'
import {useTina} from 'tinacms/dist/react'

import {Preview} from '~/components/misc/preview'
import {
  BlogPostQueryQuery,
  BlogQueryVariables,
} from '~/tina/__generated__/types'

import {BlogTemplate} from './blog-template'

function BlogPreview(props: {
  data: BlogPostQueryQuery
  query: string
  variables: BlogQueryVariables
  blogPath?: string | null
}) {
  const {data} = useTina<BlogPostQueryQuery>({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

  return (
    <>
      <Preview />
      <BlogTemplate blogPath={props.blogPath} data={data} />
    </>
  )
}

export {BlogPreview}

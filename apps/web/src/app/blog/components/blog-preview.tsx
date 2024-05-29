'use client'

import * as React from 'react'
import {useTina} from 'tinacms/dist/react'

import {BlogPostQueryQuery, BlogQueryVariables} from '~/app/cms'
import {Preview} from '~/app/cms/components'

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

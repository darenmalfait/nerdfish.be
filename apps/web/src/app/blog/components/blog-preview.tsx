'use client'

import { useTina } from 'tinacms/dist/react'

import { BlogContent } from './blog-content'
import { type BlogPostQueryQuery, type BlogQueryVariables } from '~/app/cms'
import { Preview } from '~/app/cms/components'

function BlogPreview(props: {
	data: BlogPostQueryQuery
	query: string
	variables: BlogQueryVariables
}) {
	const { data } = useTina<BlogPostQueryQuery>({
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

export { BlogPreview }

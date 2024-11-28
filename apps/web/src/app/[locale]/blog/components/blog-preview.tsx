'use client'

import { useTina } from 'tinacms/dist/react'
import { Preview } from '~/app/cms/components/preview'
import type { BlogPostQueryQuery, BlogQueryVariables } from '~/app/cms/types'
import type { Locale } from '~/app/i18n/types'
import { BlogContent } from './blog-content'

function BlogPreview(props: {
	data: BlogPostQueryQuery
	query: string
	variables: BlogQueryVariables
	locale: Locale
}) {
	const { data } = useTina<BlogPostQueryQuery>({
		query: props.query,
		variables: props.variables,
		data: props.data,
	})

	return (
		<>
			<Preview />
			<BlogContent locale={props.locale} data={data} />
		</>
	)
}

export { BlogPreview }

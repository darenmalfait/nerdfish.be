'use client'

import { useTina } from 'tinacms/dist/react'

import { PageContent } from './page-content'
import {
	Preview,
	type ContentQueryQuery,
	type ContentQueryQueryVariables,
} from '~/app/cms'

function PagePreview(props: {
	data: ContentQueryQuery
	query: string
	variables: ContentQueryQueryVariables
}) {
	const { data } = useTina<ContentQueryQuery>({
		query: props.query,
		variables: props.variables,
		data: props.data,
	})

	return (
		<>
			<Preview />
			<PageContent data={data} />
		</>
	)
}

export { PagePreview }

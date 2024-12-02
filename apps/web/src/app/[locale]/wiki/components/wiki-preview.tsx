'use client'

import { useTina } from 'tinacms/dist/react'
import { WikiContent } from './wiki-content'
import { Preview } from '~/app/cms/components/preview'
import { type WikiQueryQuery, type WikiQueryVariables } from '~/app/cms/types'

function WikiPreview(props: {
	data: WikiQueryQuery
	query: string
	variables: WikiQueryVariables
}) {
	const { data } = useTina<WikiQueryQuery>({
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

export { WikiPreview }

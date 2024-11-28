'use client'

import { useTina } from 'tinacms/dist/react'

import type { WikiQueryQuery, WikiQueryVariables } from '~/app/cms'
import { Preview } from '~/app/cms/components'
import { WikiContent } from './wiki-content'

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

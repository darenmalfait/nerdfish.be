'use client'

import { useTina } from 'tinacms/dist/react'

import { WorkContent } from './work-content'
import { type WorkQueryQuery, type WorkQueryVariables } from '~/app/cms'
import { Preview } from '~/app/cms/components'

function WorkPreview(props: {
	data: WorkQueryQuery
	query: string
	variables: WorkQueryVariables
}) {
	const { data } = useTina<WorkQueryQuery>({
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

export { WorkPreview }

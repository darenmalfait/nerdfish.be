'use client'

import { useTina } from 'tinacms/dist/react'
import { Preview } from '~/app/cms/components/preview'
import type { WorkQueryQuery, WorkQueryVariables } from '~/app/cms/types'
import { WorkContent } from './work-content'

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

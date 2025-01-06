'use client'

import { useLocale } from '@repo/i18n/client'
import { useTina } from 'tinacms/dist/react'
import { PageContent } from './page-content'
import { Preview } from '~/app/cms/components/preview'
import {
	type ContentQueryQuery,
	type ContentQueryQueryVariables,
} from '~/app/cms/types'

function PagePreview(props: {
	data: ContentQueryQuery
	query: string
	variables: ContentQueryQueryVariables
}) {
	const currentLocale = useLocale()
	const { data } = useTina<ContentQueryQuery>({
		query: props.query,
		variables: props.variables,
		data: props.data,
	})

	return (
		<>
			<Preview />
			<PageContent locale={currentLocale} data={data} />
		</>
	)
}

export { PagePreview }

'use client'

import { useTina } from 'tinacms/dist/react'
import {
	type ContentQueryQuery,
	type ContentQueryQueryVariables,
	Preview,
} from '~/app/cms'
import { useTranslation } from '~/app/i18n'
import { PageContent } from './page-content'

function PagePreview(props: {
	data: ContentQueryQuery
	query: string
	variables: ContentQueryQueryVariables
}) {
	const { currentLocale } = useTranslation()
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

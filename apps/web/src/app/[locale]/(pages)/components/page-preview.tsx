'use client'

import { useTina } from 'tinacms/dist/react'
import { PageContent } from './page-content'
import {
	Preview,
	type ContentQueryQuery,
	type ContentQueryQueryVariables,
} from '~/app/cms'
import { useTranslation } from '~/app/i18n'

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

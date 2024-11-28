'use client'

import { useTina } from 'tinacms/dist/react'
import { Preview } from '~/app/cms/components/preview'
import type {
	ContentQueryQuery,
	ContentQueryQueryVariables,
} from '~/app/cms/types'
import { useTranslation } from '~/app/i18n/translation-provider'
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

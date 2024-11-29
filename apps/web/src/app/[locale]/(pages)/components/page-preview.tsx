'use client'

import { useLocale } from 'next-intl'
import { useTina } from 'tinacms/dist/react'
import { Preview } from '~/app/cms/components/preview'
import type {
	ContentQueryQuery,
	ContentQueryQueryVariables,
} from '~/app/cms/types'
import { PageContent } from './page-content'

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

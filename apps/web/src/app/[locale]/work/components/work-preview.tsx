'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useTina } from 'tinacms/dist/react'
import { Preview } from '~/app/cms/components/preview'
import type { WorkQueryQuery, WorkQueryVariables } from '~/app/cms/types'
import { WorkOverviewBlock } from '../blocks/work-overview'
import { WorkContent } from './work-content'

function WorkPreview(props: {
	data: WorkQueryQuery
	query: string
	variables: WorkQueryVariables
}) {
	const t = useTranslations('work')
	const locale = useLocale()

	const { data } = useTina<WorkQueryQuery>({
		query: props.query,
		variables: props.variables,
		data: props.data,
	})

	return (
		<>
			<Preview />
			<WorkContent
				relatedContent={
					<WorkOverviewBlock
						featuredEnabled
						header={{
							title: t('related.title'),
							subtitle: t('related.subtitle'),
						}}
						count={1}
						locale={locale}
						relatedTo={data.work}
					/>
				}
				data={data}
			/>
		</>
	)
}

export { WorkPreview }

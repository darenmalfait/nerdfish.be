'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useTina } from 'tinacms/dist/react'
import { BlogOverviewBlock } from '../blocks/blog-overview'
import { BlogContent } from './blog-content'
import { Preview } from '~/app/cms/components/preview'
import {
	type BlogPostQueryQuery,
	type BlogQueryVariables,
} from '~/app/cms/types'
import { type Locale } from '~/app/i18n/types'

function BlogPreview(props: {
	data: BlogPostQueryQuery
	query: string
	variables: BlogQueryVariables
	locale: Locale
}) {
	const t = useTranslations('blog')
	const locale = useLocale()
	const { data } = useTina<BlogPostQueryQuery>({
		query: props.query,
		variables: props.variables,
		data: props.data,
	})

	return (
		<>
			<Preview />
			<BlogContent
				locale={props.locale}
				data={data}
				relatedContent={
					<BlogOverviewBlock
						header={{
							title: t('related.title'),
							subtitle: t('related.subtitle'),
						}}
						count={2}
						locale={locale}
						relatedTo={data.blog}
					/>
				}
			/>
		</>
	)
}

export { BlogPreview }

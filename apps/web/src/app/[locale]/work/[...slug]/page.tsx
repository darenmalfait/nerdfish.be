import { getTranslations } from '@repo/i18n/server'
import { type WithLocale } from '@repo/i18n/types'
import { pageParams } from '@repo/og-utils/zod-params'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { WorkOverviewBlock } from '../blocks/work-overview'
import { WorkContent } from '../components/work-content'
import { getWorkPath } from '../utils'
import { getRouteData } from './route-data'

export async function generateMetadata(props: {
	params: Promise<WithLocale<{ slug: string[] }>>
}): Promise<Metadata | undefined> {
	const params = await props.params
	const { work } = await getRouteData(params.slug.join('/'), params.locale)
	const title = work.seo.title

	return createMetadata({
		title,
		description: work.seo.description,
		image:
			work.seo.image ??
			`/api/og?${pageParams.toSearchString({
				heading: title,
			})}`,
		alternates: {
			canonical: work.seo.canonical ?? getWorkPath(work),
		},
		locale: params.locale,
	})
}

export default async function WorkPage(props: {
	params: Promise<WithLocale<{ slug: string[] }>>
}) {
	const params = await props.params
	const t = await getTranslations()
	const { work } = await getRouteData(params.slug.join('/'), params.locale)

	return (
		<WorkContent
			relatedContent={
				<WorkOverviewBlock
					featuredEnabled
					header={{
						title: t('work.related.title'),
						subtitle: t('work.related.subtitle'),
					}}
					count={1}
					locale={params.locale}
					relatedTo={work}
				/>
			}
			data={work}
		/>
	)
}

import { getTranslations } from '@repo/i18n/server'
import { type WithLocale } from '@repo/i18n/types'
import { pageParams } from '@repo/og-utils/zod-params'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { draftMode } from 'next/headers'
import { WorkOverviewBlock } from '../blocks/work-overview'
import { WorkContent } from '../components/work-content'
import { WorkPreview } from '../components/work-preview'
import { getWorkPath } from '../utils'
import { getRouteData } from './route-data'

export async function generateMetadata(props: {
	params: Promise<WithLocale<{ slug: string[] }>>
}): Promise<Metadata | undefined> {
	const params = await props.params
	const { data } = await getRouteData(params.slug.join('/'), params.locale)
	const title = data.work.seo?.title ?? (data.work.title || 'Untitled')

	return createMetadata({
		title,
		description: data.work.seo?.description ?? '',
		image:
			data.work.seo?.seoImg ??
			`/api/og?${pageParams.toSearchString({
				heading: title,
			})}`,
		alternates: {
			canonical: data.work.seo?.canonical ?? getWorkPath(data.work),
		},
		locale: params.locale,
	})
}

export default async function WorkPage(props: {
	params: Promise<WithLocale<{ slug: string[] }>>
}) {
	const params = await props.params
	const t = await getTranslations()
	const routeData = await getRouteData(params.slug.join('/'), params.locale)

	const { isEnabled: isPreview } = await draftMode()

	if (isPreview) return <WorkPreview {...routeData} />
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
					relatedTo={routeData.data.work}
				/>
			}
			{...routeData}
		/>
	)
}

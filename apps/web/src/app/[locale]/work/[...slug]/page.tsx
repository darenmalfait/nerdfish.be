import { createMetadata } from '@repo/seo/metadata'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { draftMode } from 'next/headers'
import { generateOGImageUrl } from '~/app/api/og/utils'
import type { WithLocale } from '~/app/i18n/types'
import { WorkOverviewBlock } from '../blocks/work-overview'
import { WorkContent } from '../components/work-content'
import { WorkPreview } from '../components/work-preview'
import { getRouteData } from './route-data'

export async function generateMetadata({
	params,
}: {
	params: WithLocale<{ slug: string[] }>
}): Promise<Metadata | undefined> {
	const { data } = await getRouteData(params.slug.join('/'), params.locale)
	const title = data.work.seo?.title ?? (data.work.title || 'Untitled')

	return createMetadata({
		title,
		description: data.work.seo?.description ?? '',
		image: data.work.seo?.seoImg
			? data.work.seo.seoImg
			: generateOGImageUrl({
					heading: title,
				}),
		alternates: {
			canonical: data.work.seo?.canonical,
		},
		locale: params.locale,
	})
}

export default async function WorkPage({
	params,
}: {
	params: WithLocale<{ slug: string[] }>
}) {
	const t = await getTranslations('work')
	const routeData = await getRouteData(params.slug.join('/'), params.locale)

	const { isEnabled: isPreview } = draftMode()

	if (isPreview) return <WorkPreview {...routeData} />
	return (
		<WorkContent
			relatedContent={
				<WorkOverviewBlock
					header={{
						title: t('related.title'),
						subtitle: t('related.subtitle'),
					}}
					count={2}
					locale={params.locale}
					relatedTo={routeData.data.work}
				/>
			}
			{...routeData}
		/>
	)
}

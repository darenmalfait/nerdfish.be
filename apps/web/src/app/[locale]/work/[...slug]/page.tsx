import { env } from '@repo/env'
import { pageParams } from '@repo/og-utils/zod-params'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getTranslations } from 'next-intl/server'
import { WorkOverviewBlock } from '../blocks/work-overview'
import { WorkContent } from '../components/work-content'
import { WorkPreview } from '../components/work-preview'
import { getWorkPath } from '../utils'
import { getRouteData } from './route-data'
import { type WithLocale } from '~/app/i18n/types'

export async function generateMetadata({
	params,
}: {
	params: WithLocale<{ slug: string[] }>
}): Promise<Metadata | undefined> {
	const { data } = await getRouteData(params.slug.join('/'), params.locale)
	const title = data.work.seo?.title ?? (data.work.title || 'Untitled')

	const canonical =
		data.work.seo?.canonical ??
		`${env.NEXT_PUBLIC_URL}${getWorkPath(data.work)}`

	return createMetadata({
		title,
		description: data.work.seo?.description ?? '',
		image: data.work.seo?.seoImg
			? data.work.seo.seoImg
			: `${env.NEXT_PUBLIC_URL}/api/og/page?${pageParams.toSearchString({
					heading: title,
				})}`,
		alternates: {
			canonical,
		},
		locale: params.locale,
	})
}

export default async function WorkPage({
	params,
}: {
	params: WithLocale<{ slug: string[] }>
}) {
	const t = await getTranslations()
	const routeData = await getRouteData(params.slug.join('/'), params.locale)

	const { isEnabled: isPreview } = draftMode()

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

import { createMetadata } from '@nerdfish-website/seo/metadata'
import { type Metadata } from 'next'
import { draftMode } from 'next/headers'
import { WorkOverviewBlock } from '../blocks'
import { getRouteData } from './route-data'
import { WorkContent } from '~/app/[locale]/work/components/work-content'
import { WorkPreview } from '~/app/[locale]/work/components/work-preview'
import { generateOGImageUrl } from '~/app/api/og'
import { type WithLocale } from '~/app/i18n'
import { getDictionary } from '~/app/i18n/get-dictionary'

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
	const t = await getDictionary(params.locale)
	const routeData = await getRouteData(params.slug.join('/'), params.locale)

	const { isEnabled: isPreview } = draftMode()

	if (isPreview) return <WorkPreview {...routeData} />
	return (
		<WorkContent
			relatedContent={
				<WorkOverviewBlock
					header={{
						title: t['work.related.title'],
						subtitle: t['work.related.subtitle'],
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

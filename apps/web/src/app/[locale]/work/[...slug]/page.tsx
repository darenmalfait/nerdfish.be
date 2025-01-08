import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/design-system/components/section'
import { getTranslations } from '@repo/i18n/server'
import { type WithLocale } from '@repo/i18n/types'
import { pageParams } from '@repo/og-utils/zod-params'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { WorkContent } from '../components/work-content'
import { WorkOverview } from '../components/work-overview'
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
	const t = await getTranslations('work.content')
	const { work } = await getRouteData(params.slug.join('/'), params.locale)

	return (
		<WorkContent
			relatedContent={
				<Section>
					<SectionHeader>
						<SectionHeaderTitle>{t('related.title')}</SectionHeaderTitle>
						<SectionHeaderSubtitle>
							{t('related.subtitle')}
						</SectionHeaderSubtitle>
					</SectionHeader>
					<WorkOverview featuredEnabled count={1} relatedTo={work} />
				</Section>
			}
			data={work}
		/>
	)
}

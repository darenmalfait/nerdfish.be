import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/design-system/components/section'
import { getTranslations } from '@repo/i18n/server'
import { type Locale, type WithLocale } from '@repo/i18n/types'
import { pageParams } from '@repo/og-utils/zod-params'
import { createMetadata } from '@repo/seo/metadata'
import { type Project } from 'content-collections'
import { type Metadata } from 'next'
import { Suspense } from 'react'
import { getRouteData } from './route-data'
import { work as workApi } from '~/features/work/api'
import { WorkContent } from '~/features/work/components/work-content'
import { WorkOverview } from '~/features/work/components/work-overview'
import { getWorkPath } from '~/features/work/utils'

export async function generateStaticParams({
	params,
}: {
	params: { locale: Locale }
}) {
	return (await workApi.getAll({ locale: params.locale })).map((item) => ({
		slug: item.slug.split('/'),
	}))
}

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

async function RelatedWork({ work }: { work: Project }) {
	const t = await getTranslations('work.content')

	return (
		<Section>
			<SectionHeader>
				<SectionHeaderTitle>{t('related.title')}</SectionHeaderTitle>
				<SectionHeaderSubtitle>{t('related.subtitle')}</SectionHeaderSubtitle>
			</SectionHeader>
			<WorkOverview featuredEnabled count={1} relatedTo={work} />
		</Section>
	)
}

export default async function WorkPage(props: {
	params: Promise<WithLocale<{ slug: string[] }>>
}) {
	const params = await props.params
	const { work } = await getRouteData(params.slug.join('/'), params.locale)

	return (
		<WorkContent
			relatedContent={
				<Suspense fallback={null}>
					<RelatedWork work={work} />
				</Suspense>
			}
			data={work}
		/>
	)
}

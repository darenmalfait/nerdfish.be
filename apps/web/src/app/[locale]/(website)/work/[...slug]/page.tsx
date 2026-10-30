import { type ComponentProps, Suspense } from 'react'
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

import { Testimonials } from '~/features/testimonials/components/testimonials'
import { getProjects } from '~/features/work/api/get-projects'
import { WorkContent } from '~/features/work/components/work-content'
import { WorkOverview } from '~/features/work/components/work-overview'
import { getWorkPath } from '~/features/work/utils/get-work-path'
import { getContentLanguageAlternates } from '~/utils/get-content-language-alternates'

import { getRouteData } from './route-data'

const WORK_BODY_COMPONENTS = {
	Testimonials: (props: ComponentProps<typeof Testimonials>) => (
		<Section compact>
			<Testimonials {...props} />
		</Section>
	),
}

export async function generateStaticParams({
	params,
}: {
	params: { locale: Locale }
}) {
	return (await getProjects({ locale: params.locale })).map((item) => ({
		slug: item.slug.split('/'),
	}))
}

export async function generateMetadata(props: {
	params: Promise<WithLocale<{ slug: string[] }>>
}): Promise<Metadata | undefined> {
	const params = await props.params
	const [{ work }, works] = await Promise.all([
		getRouteData(params.slug.join('/'), params.locale),
		getProjects(),
	])
	const title = work.seo.title
	const languages = getContentLanguageAlternates(works, work, getWorkPath)

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
			languages,
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
		<WorkContent data={work} bodyComponents={WORK_BODY_COMPONENTS}>
			<Suspense fallback={null}>
				<RelatedWork work={work} />
			</Suspense>
		</WorkContent>
	)
}

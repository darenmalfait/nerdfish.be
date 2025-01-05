import { getTranslations } from '@repo/i18n/server'
import { type WithLocale } from '@repo/i18n/types'
import { pageParams } from '@repo/og-utils/zod-params'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { AIPageContent } from './ai-page-content'

export async function generateMetadata(props: {
	params: Promise<WithLocale<{}>>
}): Promise<Metadata | undefined> {
	const params = await props.params
	const t = await getTranslations('pages.ai')

	const title = t('_meta.title')
	const description = t('_meta.description')

	return createMetadata({
		title,
		description,
		image: `/api/og?${pageParams.toSearchString({
			heading: title,
		})}`,
		locale: params.locale,
	})
}

export default async function AiPage() {
	return <AIPageContent />
}

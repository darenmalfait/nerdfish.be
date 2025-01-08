import { i18n } from '@repo/i18n/config'
import { getTranslations } from '@repo/i18n/server'
import { type WithLocale } from '@repo/i18n/types'
import { pageParams } from '@repo/og-utils/zod-params'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { AIPageContent } from './ai-page-content'
import { getPathname, getPathnames } from '~/routing'

export async function generateMetadata(props: {
	params: Promise<WithLocale>
}): Promise<Metadata | undefined> {
	const { locale } = await props.params
	const t = await getTranslations('pages.ai')

	const title = t('_meta.title')
	const description = t('_meta.description')

	return createMetadata({
		title,
		description,
		image: `/api/og?${pageParams.toSearchString({
			heading: title,
		})}`,
		alternates: {
			canonical: getPathname({ locale, href: '/ai' }),
			languages: getPathnames(
				'/ai',
				i18n.locales.filter((l) => l !== locale),
			),
		},
		locale,
	})
}

export default async function AiPage() {
	return <AIPageContent />
}

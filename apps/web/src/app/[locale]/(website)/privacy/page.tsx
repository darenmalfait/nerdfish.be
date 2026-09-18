import { i18n } from '@repo/i18n/config'
import { getTranslations } from '@repo/i18n/server'
import { type WithLocale } from '@repo/i18n/types'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { getPathname, getPathnames } from 'routing'
import { PrivacyPageContent } from '~/features/privacy/components/privacy-page'

type PageProps = {
	params: Promise<WithLocale>
}

export async function generateMetadata(
	props: PageProps,
): Promise<Metadata | undefined> {
	const { locale } = await props.params
	const t = await getTranslations('privacy.page')

	return createMetadata({
		title: t('_meta.title'),
		description: t('_meta.description'),
		alternates: {
			canonical: getPathname({ locale, href: '/privacy' }),
			languages: getPathnames(
				'/privacy',
				i18n.locales.filter((l) => l !== locale),
			),
		},
		locale,
		robots: { index: true, follow: true },
	})
}

export default async function PrivacyPage(props: PageProps) {
	await props.params

	return <PrivacyPageContent />
}

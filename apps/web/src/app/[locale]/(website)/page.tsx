import { i18n } from '@repo/i18n/config'
import { getTranslations } from '@repo/i18n/server'
import { type WithLocale } from '@repo/i18n/types'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { getPathname, getPathnames } from 'routing'
import { HomePageContent } from '~/features/home/components/home-page'

type PageProps = {
	params: Promise<WithLocale>
}

export async function generateMetadata(
	props: PageProps,
): Promise<Metadata | undefined> {
	const { locale } = await props.params
	const t = await getTranslations('home.page')

	const title = t('_meta.title')
	const description = t('_meta.description')

	return createMetadata({
		title,
		description,
		image: '/images/og.png',
		alternates: {
			canonical: getPathname({ locale, href: '/' }),
			languages: getPathnames(
				'/',
				i18n.locales.filter((l) => l !== locale),
			),
		},
		locale,
	})
}

export default async function HomePage(props: PageProps) {
	await props.params

	return <HomePageContent />
}

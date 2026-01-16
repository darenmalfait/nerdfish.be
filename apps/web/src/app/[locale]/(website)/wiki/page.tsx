import { Section } from '@repo/design-system/components/section'
import { i18n } from '@repo/i18n/config'
import { getTranslations } from '@repo/i18n/server'
import { type WithLocale } from '@repo/i18n/types'
import { pageParams } from '@repo/og-utils/zod-params'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { getPathname, getPathnames } from 'routing'
import { WikiOverview } from './components/wiki-overview'

type PageProps = {
	params: Promise<WithLocale>
}

export async function generateMetadata(
	props: PageProps,
): Promise<Metadata | undefined> {
	const { locale } = await props.params

	const t = await getTranslations('wiki.page')

	const title = t('_meta.title')
	const description = t('_meta.description')

	return createMetadata({
		title,
		description,
		image: `/api/og?${pageParams.toSearchString({
			heading: title,
		})}`,
		alternates: {
			canonical: getPathname({ locale, href: '/wiki' }),
			languages: getPathnames(
				'/wiki',
				i18n.locales.filter((l) => l !== locale),
			),
		},
		locale,
	})
}

export default async function BlogPage(props: PageProps) {
	await props.params
	const t = await getTranslations('wiki.page')

	return (
		<Section>
			<WikiOverview
				searchEnabled
				header={{
					title: t('title'),
					subtitle: t('subtitle'),
					image: {
						src: '/uploads/pages/wiki.png',
						alt: t('image.alt'),
					},
				}}
			/>
		</Section>
	)
}

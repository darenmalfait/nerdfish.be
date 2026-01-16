import { Section } from '@repo/design-system/components/section'
import { i18n } from '@repo/i18n/config'
import { getTranslations } from '@repo/i18n/server'
import { type WithLocale } from '@repo/i18n/types'
import { pageParams } from '@repo/og-utils/zod-params'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { getPathname, getPathnames } from 'routing'
import { BlogOverview } from './components/blog-overview'

type PageProps = {
	params: Promise<WithLocale>
}

export async function generateMetadata(
	props: PageProps,
): Promise<Metadata | undefined> {
	const { locale } = await props.params

	const t = await getTranslations('blog.page')

	const title = t('_meta.title')
	const description = t('_meta.description')

	return createMetadata({
		title,
		description,
		image: `/api/og?${pageParams.toSearchString({
			heading: title,
		})}`,
		alternates: {
			canonical: getPathname({ locale, href: '/blog' }),
			languages: getPathnames(
				'/blog',
				i18n.locales.filter((l) => l !== locale),
			),
		},
		locale,
	})
}

export default async function BlogOverviewPage(props: PageProps) {
	await props.params
	const t = await getTranslations('blog.page')

	return (
		<Section>
			<BlogOverview
				searchEnabled
				featuredEnabled
				header={{
					title: t('title'),
					subtitle: t('subtitle'),
					image: {
						src: '/uploads/pages/blog.png',
						alt: t('image.alt'),
					},
				}}
			/>
		</Section>
	)
}

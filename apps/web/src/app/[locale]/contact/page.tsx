import { Section } from '@repo/design-system/components/section'
import { H2, Paragraph } from '@repo/design-system/components/ui'
import { companyInfo } from '@repo/global-settings/company-info'
import { i18n } from '@repo/i18n/config'
import { getTranslations } from '@repo/i18n/server'
import { type WithLocale } from '@repo/i18n/types'
import { pageParams } from '@repo/og-utils/zod-params'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { getPathname, getPathnames } from 'routing'
import { ContactFormViaButton } from './components/contact-form-drawer'
import {
	Hero,
	HeroContent,
	HeroSubtitle,
	HeroTitle,
} from '~/app/components/hero'
import { Link } from '~/app/components/link'

type PageProps = {
	params: Promise<WithLocale>
}

export async function generateMetadata(
	props: PageProps,
): Promise<Metadata | undefined> {
	const { locale } = await props.params
	const t = await getTranslations('contact.page')

	const title = t('_meta.title')
	const description = t('_meta.description')

	return createMetadata({
		title,
		description,
		image: `/api/og?${pageParams.toSearchString({
			heading: title,
		})}`,
		alternates: {
			canonical: getPathname({ locale, href: '/contact' }),
			languages: getPathnames(
				'/contact',
				i18n.locales.filter((l) => l !== locale),
			),
		},
		locale,
	})
}

export default async function ContactPage(props: PageProps) {
	await props.params
	const t = await getTranslations('contact.page')

	return (
		<>
			<Hero>
				<h1 className="sr-only">{t('title')}</h1>
				<HeroContent>
					<HeroTitle title={t('contact.title')} />
					<HeroSubtitle>{t('contact.subtitle')}</HeroSubtitle>
					<ContactFormViaButton />
				</HeroContent>
			</Hero>
			<Section>
				<div className="mx-auto max-w-3xl">
					<H2 variant="primary">{t('content.title')}</H2>
					<Paragraph>{t('content.body')}</Paragraph>
					<div className="gap-sm mt-md flex flex-col">
						<div className="font-bold">{companyInfo.companyName}</div>
						<div>
							<Link href={`mailto:${companyInfo.email}`}>
								{companyInfo.email}
							</Link>
						</div>
						<div>
							{t('content.vat')}: {companyInfo.vat}
						</div>
					</div>
				</div>
			</Section>
		</>
	)
}

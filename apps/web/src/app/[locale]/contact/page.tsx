import { Section } from '@repo/design-system/components/section'
import { companyInfo } from '@repo/global-settings/company-info'
import { i18n } from '@repo/i18n/config'
import { getTranslations } from '@repo/i18n/server'
import { type WithLocale } from '@repo/i18n/types'
import { pageParams } from '@repo/og-utils/zod-params'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { getPathname, getPathnames } from 'routing'
import { ContactCopyEmailButton } from './components/contact-copy-email-button'
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
					<div className="md:item-center gap-friends flex flex-col items-center justify-center md:flex-row md:items-start md:justify-start">
						<ContactFormViaButton />
						<ContactCopyEmailButton />
					</div>
				</HeroContent>
			</Hero>
			<Section>
				<div className="typography mx-auto max-w-3xl">
					<h2>{t('content.title')}</h2>
					<p>{t('content.body')}</p>
					<div className="gap-best-friends mt-casual flex flex-col">
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

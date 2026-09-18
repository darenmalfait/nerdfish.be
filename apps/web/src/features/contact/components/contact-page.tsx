import { Section } from '@repo/design-system/components/section'
import { companyInfo } from '@repo/global-settings/company-info'
import { getTranslations } from '@repo/i18n/server'
import { Suspense } from 'react'
import { ContactCopyEmailButton } from '~/features/contact/components/contact-copy-email-button'
import { ContactFormViaButton } from '~/features/contact/components/contact-form-drawer'
import { Link } from '~/features/shared/components/link'
import {
	Hero,
	HeroContent,
	HeroSubtitle,
	HeroTitle,
} from '~/features/site/components/hero'

async function ContactHero() {
	const t = await getTranslations('contact.page')

	return (
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
	)
}

async function ContactContentSection() {
	const t = await getTranslations('contact.page')

	return (
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
	)
}

export async function ContactPageContent() {
	return (
		<>
			<Suspense fallback={null}>
				<ContactHero />
			</Suspense>
			<Suspense fallback={null}>
				<ContactContentSection />
			</Suspense>
		</>
	)
}

import { companyInfo } from '@repo/global-settings/company-info'
import { socials } from '@repo/global-settings/socials'
import { getTranslations } from '@repo/i18n/server'
import {
	JsonLd,
	type Person,
	type ProfessionalService,
	type WithContext,
} from '@repo/seo/json-ld'
import { author } from '@repo/seo/metadata'
import { env } from 'env'

const personId = `${env.NEXT_PUBLIC_URL}/#person`
const organizationId = `${env.NEXT_PUBLIC_URL}/#organization`

export async function HomeJsonLd() {
	const t = await getTranslations('home.page.jsonLd')
	const sameAs = Object.values(socials).filter(
		(url): url is string => typeof url === 'string',
	)

	const person: WithContext<Person> = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		'@id': personId,
		name: author.name,
		url: author.url?.toString(),
		email: companyInfo.email,
		jobTitle: t('jobTitle'),
		worksFor: { '@id': organizationId },
		sameAs,
	}

	const business: WithContext<ProfessionalService> = {
		'@context': 'https://schema.org',
		'@type': 'ProfessionalService',
		'@id': organizationId,
		name: companyInfo.companyName,
		url: env.NEXT_PUBLIC_URL,
		email: companyInfo.email,
		vatID: companyInfo.vat,
		founder: { '@id': personId },
		employee: { '@id': personId },
		areaServed: [
			{
				'@type': 'City',
				name: t('areaServed.city'),
			},
			{
				'@type': 'AdministrativeArea',
				name: t('areaServed.region'),
			},
			{
				'@type': 'Country',
				name: t('areaServed.country'),
			},
		],
		address: {
			'@type': 'PostalAddress',
			addressLocality: t('areaServed.city'),
			addressRegion: t('areaServed.region'),
			addressCountry: 'BE',
		},
	}

	return (
		<>
			<JsonLd code={person} />
			<JsonLd code={business} />
		</>
	)
}

import { i18n } from '@repo/i18n/config'
import { pageParams } from '@repo/og-utils/zod-params'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { WikiContent } from '../components/wiki-content'
import { getWikiPath } from '../utils'
import { getRouteData } from './route-data'

export async function generateMetadata(props: {
	params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
	const params = await props.params
	const { wiki } = await getRouteData(params.slug.join('/'))
	const title = wiki.seo.title

	return createMetadata({
		title,
		description: wiki.seo.description,
		image:
			wiki.seo.image ??
			`/api/og?${pageParams.toSearchString({
				heading: title,
			})}`,
		alternates: {
			canonical: wiki.seo.canonical ?? getWikiPath(wiki),
		},
		robots: {
			index: false,
			follow: false,
		},
		locale: i18n.defaultLocale,
	})
}

export default async function WikiPage(props: {
	params: Promise<{ slug: string[] }>
}) {
	const params = await props.params
	const { wiki } = await getRouteData(params.slug.join('/'))

	return <WikiContent data={wiki} />
}

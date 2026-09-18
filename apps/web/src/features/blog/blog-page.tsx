import { Section } from '@repo/design-system/components/section'
import { getTranslations } from '@repo/i18n/server'
import { type WithLocale } from '@repo/i18n/types'
import { Suspense } from 'react'
import { BlogOverview } from './components/blog-overview'

type PageProps = {
	params: Promise<WithLocale>
}

async function BlogPageContent() {
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
						src: '/images/pages/blog.png',
						alt: t('image.alt'),
					},
				}}
			/>
		</Section>
	)
}

export default async function BlogPage(props: PageProps) {
	await props.params

	return (
		<Suspense fallback={null}>
			<BlogPageContent />
		</Suspense>
	)
}

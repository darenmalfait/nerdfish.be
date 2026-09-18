import { getTranslations } from '@repo/i18n/server'

export async function SkipLink() {
	const t = await getTranslations('global.navigation')

	return (
		<a
			href="#main-content"
			className="bg-background text-foreground focus-visible:ring-ring focus-visible:rounded-base sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:px-4 focus-visible:py-2 focus-visible:ring-2 focus-visible:outline-none"
		>
			{t('skipToContent')}
		</a>
	)
}

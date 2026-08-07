import { getTranslations } from '@repo/i18n/server'
import { cn } from '@repo/lib/utils/class'
import { type ImageCredit as ImageCreditType } from '~/app/types'

const SOURCE_LABEL: Record<NonNullable<ImageCreditType['source']>, string> = {
	unsplash: 'Unsplash',
	pexels: 'Pexels',
	pixabay: 'Pixabay',
}

async function ImageCredit({
	credit,
	className,
}: {
	credit?: ImageCreditType | null
	className?: string
}) {
	if (!credit?.name) return null

	const t = await getTranslations('global.imageCredit')
	const sourceLabel = credit.source ? SOURCE_LABEL[credit.source] : null

	return (
		<p
			className={cn(
				'text-foreground-muted mt-best-friends text-center text-sm',
				className,
			)}
		>
			{t('photoBy')}{' '}
			{credit.url ? (
				<a
					href={credit.url}
					target="_blank"
					rel="noopener noreferrer"
					className="hover:text-accent underline underline-offset-2"
				>
					{credit.name}
				</a>
			) : (
				credit.name
			)}
			{sourceLabel ? ` ${t('onSource', { source: sourceLabel })}` : null}
		</p>
	)
}

export { ImageCredit }

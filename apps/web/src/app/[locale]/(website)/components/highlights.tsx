'use client'

import { type Article } from '@repo/design-system/components/article-overview'
import {
	HighlightCard,
	HighlightCardCTA,
	HighlightCardCategory,
	HighlightCardContent,
	HighlightCardDescription,
	HighlightCardImage,
	HighlightCardTitle,
} from '@repo/design-system/components/highlight-card'
import { useTranslations } from '@repo/i18n/client'
import { type ComponentProps } from 'react'
import { Link } from '~/app/[locale]/common/components/link'

export interface HighlightsProps extends ComponentProps<'div'> {
	items: Article[]
}

export function Highlights(props: HighlightsProps) {
	const { items } = props
	const t = useTranslations('global')

	return (
		<div className="gap-acquaintances flex flex-col">
			{items.map((item) => {
				const { title, category, description, image, href } = item

				return (
					<HighlightCard key={title} title={title}>
						<HighlightCardContent>
							<HighlightCardCategory value={category} />
							<HighlightCardTitle>{title}</HighlightCardTitle>
							<HighlightCardDescription>{description}</HighlightCardDescription>
							{href ? (
								<HighlightCardCTA
									as={Link}
									category={category}
									href={href}
									aria-label={t('readMoreAbout', { topic: title })}
								>
									{t('discover', { topic: title })}
								</HighlightCardCTA>
							) : null}
						</HighlightCardContent>
						<HighlightCardImage src={image?.src} alt={image?.alt} />
					</HighlightCard>
				)
			})}
		</div>
	)
}

'use client'

import { Section } from '@nerdfish-website/ui/components'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import {
	HighlightCard,
	HighlightCardCategory,
	HighlightCardContent,
	HighlightCardCTA,
	HighlightCardDescription,
	HighlightCardImage,
	HighlightCardTitle,
} from '../components'
import { getPagePath } from '~/app/[locale]/(pages)/utils'
import { type PageBlocksHighlight, type Block } from '~/app/cms'

const BlockLayout = ({ children }: { children: React.ReactNode }) => {
	if (!children) return null

	return <Section className="!p-0">{children}</Section>
}

export function HighlightBlock(props: Block<PageBlocksHighlight>) {
	const { title, category, excerpt, image, linkText, reference } = props

	const href = React.useMemo(() => {
		if (!reference) return undefined
		return getPagePath(reference)
	}, [reference])

	if (!href) return null

	return (
		<BlockLayout>
			<HighlightCard
				title={title ?? reference?.title ?? ''}
				href={href}
				className="bg-info-muted"
			>
				<HighlightCardContent>
					<HighlightCardCategory
						value={category}
						data-tina-field={tinaField(props, 'category')}
					/>
					<HighlightCardTitle data-tina-field={tinaField(props, 'title')}>
						{title}
					</HighlightCardTitle>
					<HighlightCardDescription
						data-tina-field={tinaField(props, 'excerpt')}
					>
						{excerpt}
					</HighlightCardDescription>
					<HighlightCardCTA href={href}>{linkText}</HighlightCardCTA>
				</HighlightCardContent>
				<HighlightCardImage src={image?.src} alt={image?.alt ?? ''} />
			</HighlightCard>
		</BlockLayout>
	)
}

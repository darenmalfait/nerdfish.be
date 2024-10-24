'use client'

import { Card, CardContent, CardHeader } from '@nerdfish/ui'
import { Section } from '@nerdfish-website/ui/components'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import {
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '../components'
import { PortableText, type Block, type PageBlocksHighlight } from '~/app/cms'

const BlockLayout = ({ children }: { children: React.ReactNode }) => {
	if (!children) return null

	return (
		<div className="rounded-semi mx-sm bg-muted">
			<Section>
				<Card className="rounded-semi bg-primary relative overflow-hidden">
					{children}
				</Card>
			</Section>
		</div>
	)
}

export function HighlightBlock(props: Block<PageBlocksHighlight>) {
	const { title, subtitle, content } = props

	return (
		<BlockLayout>
			<CardHeader className="!p-lg bg-transparent !pb-0">
				<SectionHeader className="mb-0">
					<SectionHeaderTitle
						data-tina-field={tinaField(props, 'title')}
						animatedText={title ?? undefined}
					/>
					<SectionHeaderSubtitle data-tina-field={tinaField(props, 'subtitle')}>
						{subtitle}
					</SectionHeaderSubtitle>
				</SectionHeader>
			</CardHeader>
			<CardContent className="prose dark:prose-invert !p-lg !pt-0">
				<PortableText
					content={content}
					data-tina-field={tinaField(props, 'content')}
				/>
			</CardContent>
		</BlockLayout>
	)
}

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
		<div className="bg-accent/20 rounded-semi mx-2">
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
			<CardHeader className="bg-transparent p-6">
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
			<CardContent className="prose dark:prose-invert p-6">
				<PortableText
					content={content}
					data-tina-field={tinaField(props, 'content')}
				/>
			</CardContent>
		</BlockLayout>
	)
}

'use client'

import { Card, CardContent, CardHeader } from '@nerdfish/ui'
import { Section } from '@nerdfish-website/ui/components'
import { tinaField } from 'tinacms/dist/react'
import {
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '../components'
import { PortableText, type Block, type PageBlocksHighlight } from '~/app/cms'

export function HighlightBlock(props: Block<PageBlocksHighlight>) {
	const { title, subtitle, content } = props

	return (
		<div className="bg-accent/20 rounded-semi mx-2">
			<Section>
				<Card className="rounded-semi bg-primary relative overflow-hidden">
					{(title ?? subtitle) ? (
						<CardHeader className="bg-transparent p-6">
							<SectionHeader className="mb-0">
								{title ? (
									<SectionHeaderTitle
										data-tina-field={tinaField(props, 'title')}
										animatedText={title}
									/>
								) : null}
								{subtitle ? (
									<SectionHeaderSubtitle
										data-tina-field={tinaField(props, 'subtitle')}
									>
										{subtitle}
									</SectionHeaderSubtitle>
								) : null}
							</SectionHeader>
						</CardHeader>
					) : null}
					<CardContent className="prose dark:prose-invert p-6">
						<PortableText
							content={content}
							data-tina-field={tinaField(props, 'content')}
						/>
					</CardContent>
				</Card>
			</Section>
		</div>
	)
}

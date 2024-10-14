'use client'

import { Card, CardContent, CardHeader } from '@nerdfish/ui'
import { Section } from '@nerdfish-website/ui/components'
import { tinaField } from 'tinacms/dist/react'
import { Header } from '../components'
import { PortableText, type Block, type PageBlocksHighlight } from '~/app/cms'

export function HighlightBlock(props: Block<PageBlocksHighlight>) {
	const { title, subtitle, content } = props

	return (
		<div className="bg-accent/20 rounded-semi mx-2">
			<Section>
				<Card className="rounded-semi bg-primary relative overflow-hidden p-8">
					{(title ?? subtitle) ? (
						<CardHeader
							data-tina-field={tinaField(props, 'title')}
							className="bg-transparent"
						>
							<Header
								data-tina-field={tinaField(props, 'subtitle')}
								title={title?.toString()}
								subtitle={subtitle}
							/>
						</CardHeader>
					) : null}
					<CardContent className="prose dark:prose-invert">
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

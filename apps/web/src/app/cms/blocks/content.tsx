import { Section } from '@repo/ui/components'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { PortableText, type Block, type PageBlocksContent } from '~/app/cms'

function BlockLayout({ children }: { children: React.ReactNode }) {
	if (!children) return null

	return (
		<Section>
			<div className="prose dark:prose-invert prose-lg lg:prose-xl mx-auto max-w-3xl">
				{children}
			</div>
		</Section>
	)
}

export function ContentBlock(data: Block<PageBlocksContent>) {
	const { body } = data

	return (
		<BlockLayout>
			{body ? (
				<PortableText
					data-tina-field={tinaField(data, 'body')}
					content={body}
				/>
			) : null}
		</BlockLayout>
	)
}

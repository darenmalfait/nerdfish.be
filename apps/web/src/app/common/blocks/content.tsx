import { Section } from '@nerdfish-website/ui/components'
import { tinaField } from 'tinacms/dist/react'

import { PortableText, type Block, type PageBlocksContent } from '~/app/cms'

export function ContentBlock(data: Block<PageBlocksContent>) {
	const { body } = data

	return (
		<Section data-tina-field={tinaField(data, 'body')}>
			<div className="prose dark:prose-invert prose-lg lg:prose-xl mx-auto max-w-3xl">
				{body ? <PortableText content={body} /> : null}
			</div>
		</Section>
	)
}

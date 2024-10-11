import { tinaField } from 'tinacms/dist/react'

import { BlockSection } from './components/block-section'
import { PortableText, type Block, type PageBlocksContent } from '~/app/cms'

export function ContentBlock(data: Block<PageBlocksContent>) {
	const { body } = data

	return (
		<BlockSection data-tina-field={tinaField(data, 'body')}>
			<div className="prose dark:prose-invert prose-lg lg:prose-xl mx-auto">
				{body ? <PortableText content={body} /> : null}
			</div>
		</BlockSection>
	)
}

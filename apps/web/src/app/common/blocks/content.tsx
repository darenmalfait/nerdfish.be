import { tinaField } from 'tinacms/dist/react'

import { PortableText, type Block, type PageBlocksContent } from '~/app/cms'

export function ContentBlock(data: Block<PageBlocksContent>) {
	const { body } = data

	return (
		<section
			className="text-primary container mx-auto my-12 px-4 py-12"
			data-tina-field={tinaField(data, 'body')}
		>
			<div className="prose dark:prose-invert prose-lg lg:prose-xl mx-auto">
				{body ? <PortableText content={body} /> : null}
			</div>
		</section>
	)
}

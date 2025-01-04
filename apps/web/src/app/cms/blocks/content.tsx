import { Section } from '@repo/design-system/components/section'
import type * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { PortableText } from '../components/portable-text'
import { type PageBlocksContent } from '~/app/cms/types'

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

export function ContentBlock(data: PageBlocksContent) {
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

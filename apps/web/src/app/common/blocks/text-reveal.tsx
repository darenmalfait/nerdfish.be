'use client'

import { Section, TextReveal } from '@nerdfish-website/ui/components'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { type PageBlocksTextReveal, type Block } from '~/app/cms'

export function TextRevealBlock(props: Block<PageBlocksTextReveal>) {
	const { label } = props

	if (!label) return null

	return (
		<Section>
			<TextReveal data-tina-field={tinaField(props, 'label')} text={label} />
		</Section>
	)
}

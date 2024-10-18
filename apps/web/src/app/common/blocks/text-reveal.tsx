'use client'

import {
	ScrollIndicator,
	Section,
	TextReveal,
} from '@nerdfish-website/ui/components'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { type PageBlocksTextReveal, type Block } from '~/app/cms'

export function TextRevealBlock(props: Block<PageBlocksTextReveal>) {
	const ref = React.useRef<HTMLDivElement>(null)
	const { label } = props

	if (!label) return null

	return (
		<div className="bg-muted rounded-semi relative mx-2">
			<button
				type="button"
				className="group absolute left-1/2 top-24 z-10 mx-auto block -translate-x-1/2 p-10"
				onClick={() => {
					ref.current?.scrollIntoView({ behavior: 'smooth' })
				}}
			>
				<ScrollIndicator className="animate-in fade-in-0 slide-in-from-bottom group-hover:border-muted group-hover:text-primary block duration-700">
					<span className="sr-only">Scroll down</span>
				</ScrollIndicator>
			</button>
			<Section>
				<TextReveal
					ref={ref}
					data-tina-field={tinaField(props, 'label')}
					text={label}
				/>
			</Section>
		</div>
	)
}

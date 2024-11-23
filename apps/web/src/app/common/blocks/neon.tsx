'use client'

import { H2 } from '@nerdfish/ui'
import {
	InViewBackground,
	NeonGradientCard,
	Section,
	SectionHeaderSubtitle,
} from '@nerdfish-website/ui/components'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { PortableText, type Block, type PageBlocksNeon } from '~/app/cms'

export function NeonBlock(props: Block<PageBlocksNeon>) {
	const { title, subtitle, content } = props

	return (
		<InViewBackground>
			<Section>
				<NeonGradientCard
					neonColors={{
						firstColor: '#D46536',
						secondColor: '#0D677B',
					}}
				>
					<H2>{title}</H2>
					<SectionHeaderSubtitle className="mb-lg">
						{subtitle}
					</SectionHeaderSubtitle>
					<div className="prose dark:prose-invert">
						<PortableText
							content={content}
							data-tina-field={tinaField(props, 'content')}
						/>
					</div>
				</NeonGradientCard>
			</Section>
		</InViewBackground>
	)
}

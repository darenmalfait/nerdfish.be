'use client'

import {
	InViewBackground,
	NeonGradientCard,
	Section,
} from '@nerdfish-website/ui/components'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import {
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '../components'
import { PortableText, type Block, type PageBlocksNeon } from '~/app/cms'

const BlockLayout = ({ children }: { children: React.ReactNode }) => {
	if (!children) return null

	return (
		<InViewBackground>
			<Section className="">
				<NeonGradientCard
					neonColors={{
						firstColor: '#D46536',
						secondColor: '#0D677B',
					}}
				>
					{children}
				</NeonGradientCard>
			</Section>
		</InViewBackground>
	)
}

export function NeonBlock(props: Block<PageBlocksNeon>) {
	const { title, subtitle, content } = props

	return (
		<BlockLayout>
			<SectionHeader className="mb-0">
				<SectionHeaderTitle data-tina-field={tinaField(props, 'title')}>
					{title}
				</SectionHeaderTitle>
				<SectionHeaderSubtitle data-tina-field={tinaField(props, 'subtitle')}>
					{subtitle}
				</SectionHeaderSubtitle>
			</SectionHeader>

			<div className="prose dark:prose-invert">
				<PortableText
					content={content}
					data-tina-field={tinaField(props, 'content')}
				/>
			</div>
		</BlockLayout>
	)
}

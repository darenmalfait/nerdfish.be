import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/design-system/components/section'
import * as React from 'react'
import { Testimonials } from '../../testimonials/components/testimonials'

import { Body as BaseBody } from '~/app/components/body'
import { ImageGrid } from '~/app/components/image-grid'
import { SkillItem, Skills, type SkillItemProps } from '~/app/components/skills'

interface SkillsBlockProps extends React.ComponentProps<typeof Skills> {
	title: string
	description: string
	items: SkillItemProps['skill'][]
}

function SkillsBlock({
	title,
	description,
	items,
	...props
}: SkillsBlockProps) {
	return (
		<Section>
			<SectionHeader>
				<SectionHeaderTitle>{title}</SectionHeaderTitle>
				<SectionHeaderSubtitle>{description}</SectionHeaderSubtitle>
			</SectionHeader>
			<Skills {...props}>
				{items.map((item) => (
					<SkillItem key={item} skill={item} />
				))}
			</Skills>
		</Section>
	)
}

export function Body(props: React.ComponentProps<typeof BaseBody>) {
	return (
		<BaseBody
			{...props}
			components={{
				// blocks
				Testimonials: (rest: React.ComponentProps<typeof Testimonials>) => (
					<Section>
						<Testimonials {...rest} />
					</Section>
				),
				ImageGrid: (rest: React.ComponentProps<typeof ImageGrid>) => (
					<Section>
						<ImageGrid {...rest} />
					</Section>
				),
				Skills: SkillsBlock,
			}}
		/>
	)
}

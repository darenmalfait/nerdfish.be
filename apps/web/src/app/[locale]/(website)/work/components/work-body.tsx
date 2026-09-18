import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/design-system/components/section'
import { type ComponentProps } from 'react'
import { Testimonials } from '../../testimonials/components/testimonials'
import { SkillItem, Skills, type SkillItemProps } from '~/features/site/client'
import { Body as BaseBody, ImageGrid } from '~/features/site/server'

interface SkillsBlockProps extends ComponentProps<typeof Skills> {
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
		<Section compact>
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

export function Body(props: ComponentProps<typeof BaseBody>) {
	return (
		<BaseBody
			{...props}
			components={{
				// blocks
				Testimonials: (rest: ComponentProps<typeof Testimonials>) => (
					<Section compact>
						<Testimonials {...rest} />
					</Section>
				),
				ImageGrid: (rest: ComponentProps<typeof ImageGrid>) => (
					<Section compact>
						<ImageGrid {...rest} />
					</Section>
				),
				Skills: SkillsBlock,
			}}
		/>
	)
}

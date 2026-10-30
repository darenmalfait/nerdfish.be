import { type ComponentProps, type ComponentType } from 'react'
import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/design-system/components/section'

import { Body as BaseBody } from '~/components/body'
import { ImageGrid } from '~/components/image-grid'
import { SkillItem, Skills, type SkillItemProps } from '~/components/skills'

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

// never: accepts components with any props, so the route can pass any block
export type WorkBodyComponents = Record<string, ComponentType<never>>

export function Body({
	components,
	...props
}: ComponentProps<typeof BaseBody> & { components?: WorkBodyComponents }) {
	return (
		<BaseBody
			{...props}
			components={{
				ImageGrid: (rest: ComponentProps<typeof ImageGrid>) => (
					<Section compact>
						<ImageGrid {...rest} />
					</Section>
				),
				Skills: SkillsBlock,
				...components,
			}}
		/>
	)
}

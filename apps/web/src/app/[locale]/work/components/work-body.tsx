import * as React from 'react'
import { TestimonialsBlock } from '../../testimonials/blocks/testimonials'
import { ImageGridBlock } from '~/app/cms/blocks/image-grid'
import { SkillsBlock } from '~/app/cms/blocks/skills'
import { Body as BaseBody } from '~/app/cms/components/body'

export function Body(props: React.ComponentProps<typeof BaseBody>) {
	return (
		<BaseBody
			{...props}
			components={{
				// blocks
				Testimonials: TestimonialsBlock,
				ImageGrid: ImageGridBlock,
				Skills: SkillsBlock,
			}}
		/>
	)
}

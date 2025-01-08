import { Section } from '@repo/design-system/components/section'
import * as React from 'react'
import { Testimonials } from '../../testimonials/components/testimonials'
import { Body as BaseBody } from '~/app/components/body'
import { ImageGrid } from '~/app/components/image-grid'
import { Skills } from '~/app/components/skills'

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
				Skills: (rest: React.ComponentProps<typeof Skills>) => (
					<Section>
						<Skills {...rest} />
					</Section>
				),
			}}
		/>
	)
}

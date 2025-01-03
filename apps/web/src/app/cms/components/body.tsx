import { Body as BaseBody } from '@repo/content-collections/components/body'
import { H1, H2, H3, H4 } from '@repo/design-system/components/ui'
import * as React from 'react'
import { PortableButton } from './body/portable-button'
import { PortableCode } from './body/portable-code'
import { PortableImage } from './body/portable-image'
import { PortableLink } from './body/portable-link'
import { SlowLoading } from './body/widgets/slow-loading'

export function Body(props: React.ComponentProps<typeof BaseBody>) {
	const { components, ...rest } = props

	return (
		<BaseBody
			{...rest}
			components={{
				Button: PortableButton,
				code_block: PortableCode,
				image: PortableImage,
				img: PortableImage,
				h1: ({ children }: { children: React.ReactNode }) => (
					<H1 variant="primary">{children}</H1>
				),
				h2: ({ children }: { children: React.ReactNode }) => (
					<H2 variant="primary">{children}</H2>
				),
				h3: ({ children }: { children: React.ReactNode }) => (
					<H3>{children}</H3>
				),
				h4: ({ children }: { children: React.ReactNode }) => (
					<H4>{children}</H4>
				),
				a: PortableLink,

				// widgets
				SlowLoading,

				// base body components
				...(components as Record<string, React.ComponentType<any>>),
			}}
		/>
	)
}

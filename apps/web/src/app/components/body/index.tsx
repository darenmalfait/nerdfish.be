import { Body as BaseBody } from '@repo/content-collections/components/body'
import { H1, H2, H3, H4 } from '@repo/design-system/components/ui'
import { type ComponentType, type ComponentProps, type ReactNode } from 'react'
import { PortableButton } from './portable-button'
import { PortableCode } from './portable-code'
import { PortableImage } from './portable-image'
import { PortableLink } from './portable-link'
import { SlowLoading } from './widgets/slow-loading'

export function Body(props: ComponentProps<typeof BaseBody>) {
	const { components, ...rest } = props

	return (
		<BaseBody
			{...rest}
			components={{
				Button: PortableButton,
				pre: PortableCode,
				image: PortableImage,
				img: PortableImage,
				h1: ({ children }: { children: ReactNode }) => (
					<H1 variant="primary">{children}</H1>
				),
				h2: ({ children }: { children: ReactNode }) => (
					<H2 variant="primary">{children}</H2>
				),
				h3: ({ children }: { children: ReactNode }) => <H3>{children}</H3>,
				h4: ({ children }: { children: ReactNode }) => <H4>{children}</H4>,
				a: PortableLink,

				// widgets
				SlowLoading,

				// base body components
				...(components as Record<string, ComponentType<any>>),
			}}
		/>
	)
}

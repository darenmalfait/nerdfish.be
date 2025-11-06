import { Body as BaseBody } from '@repo/content-collections/components/body'
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
					<h1 className="typography-heading">{children}</h1>
				),
				h2: ({ children }: { children: ReactNode }) => (
					<h2 className="typography-heading">{children}</h2>
				),
				h3: ({ children }: { children: ReactNode }) => (
					<h3 className="typography-heading-sm">{children}</h3>
				),
				h4: ({ children }: { children: ReactNode }) => (
					<h4 className="typography-title">{children}</h4>
				),
				a: PortableLink,

				// widgets
				SlowLoading,

				// base body components
				...(components as Record<string, ComponentType<any>>),
			}}
		/>
	)
}

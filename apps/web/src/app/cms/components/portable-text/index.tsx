'use client'

import { type ExtractProps } from '@nerdfish/utils'
import * as React from 'react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { PortableButton } from './portable-button'
import { PortableCode } from './portable-code'
import { PortableHeading } from './portable-heading'
import { PortableImage } from './portable-image'
import { PortableLink } from './portable-link'

function PortableText(props?: ExtractProps<typeof TinaMarkdown>) {
	if (!props?.content) return null

	return (
		<TinaMarkdown
			{...props}
			components={
				{
					Button: PortableButton,
					code_block: PortableCode,
					image: PortableImage,
					img: PortableImage,
					h1: PortableHeading,
					h2: PortableHeading,
					h3: PortableHeading,
					h4: PortableHeading,
					a: PortableLink,
				} as {
					[key: string]: React.ElementType
				}
			}
		/>
	)
}

export { PortableText }

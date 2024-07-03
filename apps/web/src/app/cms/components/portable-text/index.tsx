'use client'

import { type ExtractProps } from '@nerdfish/utils'
import { TinaMarkdown } from 'tinacms/dist/rich-text'

import { PortableButton } from './portable-button'
import { PortableCode } from './portable-code'
import { PortableContactForm } from './portable-contact-form'
import { PortableImage } from './portable-image'
import { Link } from '~/app/common'

function PortableText(props: ExtractProps<typeof TinaMarkdown>) {
	return (
		<TinaMarkdown
			{...props}
			components={
				{
					Button: PortableButton,
					ContactForm: PortableContactForm,
					code_block: PortableCode,
					image: PortableImage,
					a: Link,
				} as any
			}
		/>
	)
}

export { PortableText }

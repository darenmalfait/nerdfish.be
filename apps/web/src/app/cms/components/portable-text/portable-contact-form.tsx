'use client'

import { type ExtractProps } from '@nerdfish/utils'
import * as React from 'react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { ContactForm } from '~/app/email'

export function PortableContactForm({
	content,
}: {
	content?: ExtractProps<typeof TinaMarkdown>['content']
}) {
	return (
		<div className="not-prose [&:not(:first-child)]:!mt-lg">
			{content ? (
				<div className="mb-lg">
					<TinaMarkdown content={content} />
				</div>
			) : null}
			<ContactForm />
		</div>
	)
}

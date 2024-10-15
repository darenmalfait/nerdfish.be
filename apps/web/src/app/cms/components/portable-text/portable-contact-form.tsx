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
		<div className="not-prose space-y-6">
			{content ? <TinaMarkdown content={content} /> : null}
			<ContactForm />
		</div>
	)
}

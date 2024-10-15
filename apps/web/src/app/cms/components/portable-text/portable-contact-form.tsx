'use client'

import * as React from 'react'
import { ContactForm } from '~/app/email'

export function PortableContactForm() {
	return (
		<div className="not-prose space-y-6">
			<ContactForm />
		</div>
	)
}

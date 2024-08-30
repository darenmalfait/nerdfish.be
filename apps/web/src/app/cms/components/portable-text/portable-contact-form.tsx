'use client'

import { FieldDescription, FieldLabel, H2 } from '@nerdfish/ui'
import * as React from 'react'

import { ContactForm } from '~/app/email'

type FormType = 'basic' | 'project' | 'coffee'

function FormOption({
	type,
	onSelect,
	label,
	description,
}: {
	type: FormType
	onSelect: (selectedType: FormType) => void
	label: string
	description?: string
}) {
	return (
		<button
			onClick={() => {
				onSelect(type)
			}}
			className="bg-muted shadow-outline hover:bg-inverted group relative block cursor-pointer rounded-lg px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between"
		>
			<div className="pointer-events-none flex w-full items-center justify-between">
				<div className="flex items-center">
					<div className="text-sm">
						<FieldLabel
							htmlFor={type}
							className="text-primary group-hover:text-inverted font-bold"
						>
							{label}
						</FieldLabel>
						{description ? (
							<FieldDescription className="text-muted group-hover:text-inverted inline">
								{description}
							</FieldDescription>
						) : null}
					</div>
				</div>
			</div>
		</button>
	)
}

function FormSelector({
	onSubmit,
	heading,
}: {
	onSubmit: (selectedType: FormType) => void
	heading?: string
}) {
	return (
		<div className="not-prose flex flex-col space-y-8">
			{heading ? <H2>{heading}</H2> : null}
			<div className="flex flex-col space-y-4">
				<FormOption
					onSelect={onSubmit}
					type="project"
					label="skip the small talk"
				/>
				<FormOption
					onSelect={onSubmit}
					type="basic"
					label="talk about the weather"
				/>
				<FormOption onSelect={onSubmit} type="coffee" label="grab a coffee" />
			</div>
		</div>
	)
}

function PortableContactForm({ heading }: { heading?: string }) {
	const [selectedForm, setSelectedForm] = React.useState<FormType | null>(null)

	const onFormChoice = React.useCallback((choice: FormType) => {
		setSelectedForm(choice)
	}, [])

	return (
		<div className="not-prose">
			{selectedForm ? (
				<div>
					{selectedForm === 'coffee' ? (
						<H2>
							grab a coffee{' '}
							<span role="img" aria-label="Coffee">
								☕
							</span>
							?
						</H2>
					) : null}
					<ContactForm withProject={selectedForm === 'project'} />
				</div>
			) : (
				<FormSelector heading={heading} onSubmit={onFormChoice} />
			)}
		</div>
	)
}

export { PortableContactForm }

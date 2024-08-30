'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
	Alert,
	Button,
	FieldDescription,
	FieldLabel,
	FormHelperText,
	Input,
	RadioGroup,
} from '@nerdfish/ui'
import {
	contactSchema,
	type ContactFormData,
} from '@nerdfish-website/lib/validations'
import { Loader2 } from 'lucide-react'
import * as React from 'react'
import { useForm } from 'react-hook-form'

import { useRecaptcha } from '../../utils/recaptcha'
import { submitContactForm } from './actions'

function ContactForm({ withProject }: { withProject?: boolean }) {
	const { execute } = useRecaptcha()
	const [error, setError] = React.useState<string>()

	const {
		handleSubmit,
		register,
		reset,
		getValues,
		formState: { errors, isSubmitting, isSubmitSuccessful },
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			name: '',
			email: '',
			textMessage: '',
			project: 'webdesign',
		},
	})

	async function onSubmit(data: ContactFormData) {
		try {
			setError(undefined)
			let recaptchaResponse

			if (process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY) {
				try {
					recaptchaResponse = await execute()
				} catch {
					throw new Error('reCAPTCHA error')
				}
			}

			const result = await submitContactForm({
				...data,
				recaptchaResponse,
			})

			if (!result.success) {
				throw new Error('An error occurred while submitting the form.')
			}

			reset()
		} catch (e) {
			if (e instanceof Error) {
				console.error(e.message)
			} else {
				console.error('An error occurred while submitting the form.')
			}
		}
	}

	return (
		<form noValidate onSubmit={handleSubmit(onSubmit)}>
			<fieldset>
				<div className="mb-8 space-y-8">
					<Input
						label="Name"
						id="name"
						error={errors.name?.message}
						{...register('name')}
					/>
					<Input
						label="Email"
						id="email"
						error={errors.email?.message}
						{...register('email')}
					/>
					{withProject ? (
						<div className="not-prose space-y-3">
							<RadioGroup.Root
								{...register('project')}
								defaultValue={getValues('project')}
								label="What are you interested in?"
								description='Select "Other" if you have a different project in mind.'
								aria-label="Project"
							>
								<RadioGroup.Field>
									<RadioGroup.Item value="webdesign" id="webdesign" />
									<FieldLabel htmlFor="webdesign">Webdesign</FieldLabel>
									<FieldDescription>
										Design and development of websites.
									</FieldDescription>
								</RadioGroup.Field>
								<RadioGroup.Field>
									<RadioGroup.Item value="services" id="services" />
									<FieldLabel htmlFor="services">Services</FieldLabel>
									<FieldDescription>
										Consulting, workshops, and more.
									</FieldDescription>
								</RadioGroup.Field>
								<RadioGroup.Field>
									<RadioGroup.Item value="other" id="other" />
									<FieldLabel htmlFor="other">Other</FieldLabel>
									<FieldDescription>
										Let&apos;s talk about your project.
									</FieldDescription>
								</RadioGroup.Field>
							</RadioGroup.Root>
						</div>
					) : null}
					<Input
						type="textarea"
						label="Message"
						id="message"
						error={errors.textMessage?.message}
						{...register('textMessage')}
					/>
					<FormHelperText>
						We only use your data to get in touch with you.
					</FormHelperText>
					{isSubmitSuccessful && !error ? (
						<Alert.Root variant="success">
							<Alert.Title>Success</Alert.Title>
							<Alert.Description>
								Your message has been sent successfully.{' '}
								<span role="img" aria-label="party popper">
									🎉
								</span>
							</Alert.Description>
						</Alert.Root>
					) : (
						<Button
							disabled={isSubmitting || (isSubmitSuccessful && !error)}
							type="submit"
						>
							{isSubmitting ? <Loader2 className="mr-2 animate-spin" /> : null}
							Send message
						</Button>
					)}
				</div>
				{errors.recaptchaResponse?.message ? (
					<Alert.Root variant="danger">
						<Alert.Title>reCAPTCHA error</Alert.Title>
						<Alert.Description>
							Please verify that you are not a robot.
						</Alert.Description>
					</Alert.Root>
				) : null}
				{error ? (
					<Alert.Root variant="danger">
						<Alert.Title>Error</Alert.Title>
						<Alert.Description>{error}</Alert.Description>
					</Alert.Root>
				) : null}
			</fieldset>
		</form>
	)
}

export { ContactForm }

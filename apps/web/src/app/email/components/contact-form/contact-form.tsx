'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
	Alert,
	AlertDescription,
	AlertTitle,
	Button,
	Description,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	RadioGroup,
	RadioGroupField,
	RadioGroupItem,
	Textarea,
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
import { useTranslation } from '~/app/[locale]/translation-provider'

function ContactForm() {
	const { t } = useTranslation()
	const { execute } = useRecaptcha()
	const [error, setError] = React.useState<string>()

	const form = useForm<ContactFormData>({
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
				throw new Error(t('contact.genericError'))
			}

			form.reset()
		} catch (e) {
			if (e instanceof Error) {
				console.error(e.message)
			} else {
				console.error(t('contact.genericError'))
			}
		}
	}

	return (
		<Form {...form}>
			<form noValidate onSubmit={form.handleSubmit(onSubmit)}>
				<fieldset>
					<div className="mb-lg space-y-lg">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('contact.name')}</FormLabel>

									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('contact.email')}</FormLabel>

									<FormControl>
										<Input type="email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="project"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('contact.project')}</FormLabel>

									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormItem>
												<RadioGroupField>
													<FormControl>
														<RadioGroupItem value="webdesign" />
													</FormControl>
													<FormLabel>
														{t('contact.webdesign')}
														<FormDescription>
															{t('contact.webdesignDescription')}
														</FormDescription>
													</FormLabel>
												</RadioGroupField>
											</FormItem>

											<FormItem>
												<RadioGroupField>
													<FormControl>
														<RadioGroupItem value="services" />
													</FormControl>
													<FormLabel>
														{t('contact.services')}
														<FormDescription>
															{t('contact.servicesDescription')}
														</FormDescription>
													</FormLabel>
												</RadioGroupField>
											</FormItem>

											<FormItem>
												<RadioGroupField>
													<FormControl>
														<RadioGroupItem value="other" />
													</FormControl>
													<FormLabel>
														{t('contact.other')}
														<FormDescription>
															{t('contact.otherDescription')}
														</FormDescription>
													</FormLabel>
												</RadioGroupField>
											</FormItem>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="textMessage"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Message</FormLabel>

									<FormControl>
										<Textarea {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Description>{t('contact.dataUsage')}</Description>

						{form.formState.isSubmitSuccessful && !error ? (
							<Alert variant="success">
								<AlertTitle>Success</AlertTitle>
								<AlertDescription>
									{t('contact.success')}
									<span role="img" aria-label="party popper">
										🎉
									</span>
								</AlertDescription>
							</Alert>
						) : (
							<Button
								disabled={
									form.formState.isSubmitting ||
									(form.formState.isSubmitSuccessful && !error)
								}
								type="submit"
							>
								{form.formState.isSubmitting ? (
									<Loader2 className="mr-2 animate-spin" />
								) : null}
								{t('contact.send')}
							</Button>
						)}
					</div>
					{form.formState.errors.recaptchaResponse?.message ? (
						<Alert variant="danger">
							<AlertTitle>reCAPTCHA error</AlertTitle>
							<AlertDescription>{t('contact.recaptchaError')}</AlertDescription>
						</Alert>
					) : null}

					{error ? (
						<Alert variant="danger">
							<AlertTitle>Error</AlertTitle>
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					) : null}
				</fieldset>
			</form>
		</Form>
	)
}

export { ContactForm }

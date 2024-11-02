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
	H3,
	Input,
	LoadingAnimation,
	RadioGroup,
	RadioGroupField,
	RadioGroupItem,
	Textarea,
} from '@nerdfish/ui'
import {
	contactSchema,
	type ContactFormData,
} from '@nerdfish-website/lib/validations'
import { ArrowRightIcon } from '@nerdfish-website/ui/icons'
import * as React from 'react'
import { useForm } from 'react-hook-form'

import { useRecaptcha } from '../../utils/recaptcha'
import { submitContactForm } from './actions'
import { useTranslation } from '~/app/i18n'

function Fieldset({
	children,
	title,
}: {
	children: React.ReactNode
	title: string
}) {
	return (
		<fieldset className="p-lg mb-lg rounded-semi shadow-outline">
			<H3 className="mb-lg">{title}</H3>
			<div className="space-y-md">{children}</div>
		</fieldset>
	)
}

export function ContactForm() {
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
				<div>
					<Fieldset title={t('contact.fieldset.customer')}>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('contact.name')}</FormLabel>

									<FormControl>
										<Input inputSize="lg" {...field} />
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
										<Input inputSize="lg" type="email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</Fieldset>

					<Fieldset title={t('contact.fieldset.project')}>
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
					</Fieldset>

					<Fieldset title={t('contact.fieldset.message')}>
						<FormField
							control={form.control}
							name="textMessage"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('contact.message')}</FormLabel>

									<FormControl>
										<Textarea inputSize="lg" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</Fieldset>

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
							className="mt-md group"
							size="lg"
							disabled={
								form.formState.isSubmitting ||
								(form.formState.isSubmitSuccessful && !error)
							}
							type="submit"
						>
							{form.formState.isSubmitting ? (
								<LoadingAnimation className="mr-2 size-4" variant="classic" />
							) : null}
							{t('contact.send')}
							<ArrowRightIcon className="ml-sm group-hover:translate-x-sm size-4 transition-all" />
						</Button>
					)}
				</div>
				{form.formState.errors.recaptchaResponse?.message ? (
					<Alert variant="danger" className="mt-lg">
						<AlertTitle>reCAPTCHA error</AlertTitle>
						<AlertDescription>{t('contact.recaptchaError')}</AlertDescription>
					</Alert>
				) : null}

				{error ? (
					<Alert variant="danger" className="mt-lg">
						<AlertTitle>Error</AlertTitle>
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				) : null}
			</form>
		</Form>
	)
}

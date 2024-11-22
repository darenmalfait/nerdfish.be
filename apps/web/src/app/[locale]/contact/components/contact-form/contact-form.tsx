'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
	Alert,
	AlertDescription,
	AlertTitle,
	Button,
	Checkbox,
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
	Slider,
	SliderThumb,
	Textarea,
} from '@nerdfish/ui'
import { env } from '@nerdfish-website/env'
import { parseError } from '@nerdfish-website/observability/error'
import { ArrowRightIcon } from '@nerdfish-website/ui/icons'
import { useNumberFormatter } from '@react-aria/i18n'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { submitContactForm } from './actions'
import { type ContactFormData, contactSchema, projectTypes } from './validation'
import { useTranslation } from '~/app/i18n'
import { useRecaptcha } from '~/app/recaptcha'

function Fieldset({
	children,
	title,
}: {
	children: React.ReactNode
	title: string
}) {
	return (
		<fieldset className="mb-lg rounded-large">
			<H3 className="mb-lg">{title}</H3>
			<div className="space-y-md">{children}</div>
		</fieldset>
	)
}

const BUDGET_RANGE = [500, 10000]

export function ContactForm() {
	const numberFormatter = useNumberFormatter({
		notation: 'compact',
	})
	const { t } = useTranslation()
	const { execute } = useRecaptcha()
	const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false)
	const [error, setError] = React.useState<string>()

	const form = useForm<ContactFormData>({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			name: '',
			email: '',
			textMessage: '',
			projectType: [],
			budgetRange: [1500, 4000],
		},
	})

	async function onSubmit(data: ContactFormData) {
		try {
			setError(undefined)
			let recaptchaResponse

			if (env.NEXT_PUBLIC_RECAPTCHA_SITEKEY) {
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

			if (result.success) {
				setIsSubmitted(true)
				return form.reset()
			}

			if (result.error) setError(result.error)
			else setError(t('contact.genericError'))
		} catch (e) {
			const errorMessage = parseError(e)
			setError(errorMessage)
		}
	}

	const selectedProjectTypes = form.watch('projectType')

	return (
		<Form {...form}>
			<form noValidate onSubmit={form.handleSubmit(onSubmit)}>
				<div>
					<Fieldset title={t('contact.fieldset.customer')}>
						<div className="gap-md flex w-full flex-col md:flex-row">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem className="w-full">
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
								name="company"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>{t('contact.company')}</FormLabel>

										<FormControl>
											<Input inputSize="lg" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

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
							name="projectType"
							render={() => (
								<FormItem>
									<FormLabel>{t('contact.projectType')}</FormLabel>
									<FormDescription>
										{t('contact.projectTypeDescription')}
									</FormDescription>
									<div className="gap-sm flex">
										{projectTypes.map((type) => (
											<FormField
												key={type}
												control={form.control}
												name="projectType"
												render={({ field }) => {
													const checked = field.value.includes(type)

													return (
														<FormItem key={type}>
															<FormControl>
																<label className="gap-sm flex items-center">
																	<span className="sr-only inline">
																		<Checkbox
																			aria-label={type}
																			checked={checked}
																			onChange={(e) => {
																				return e.target.checked
																					? field.onChange([
																							...field.value,
																							type,
																						])
																					: field.onChange(
																							field.value.filter(
																								(value) => value !== type,
																							),
																						)
																			}}
																		/>
																	</span>
																	<Button
																		aria-hidden
																		asChild
																		aria-label={type}
																		variant={checked ? 'accent' : 'outline'}
																		className="inline cursor-pointer"
																	>
																		<span>{type}</span>
																	</Button>
																</label>
															</FormControl>
														</FormItem>
													)
												}}
											/>
										))}
										<FormMessage />
									</div>
								</FormItem>
							)}
						/>

						{selectedProjectTypes.includes('webdesign') ? (
							<FormField
								control={form.control}
								name="budgetRange"
								render={({ field }) => {
									const [min = 0, max = 0] = BUDGET_RANGE

									return (
										<FormItem>
											<FormLabel>
												{t('contact.budgetRange')}
												<FormDescription>
													{t('contact.budgetRangeDescription')}
												</FormDescription>
												<div className="text-muted pt-md flex items-center justify-center font-semibold">
													€ {numberFormatter.format(field.value?.[0] ?? 0)} - €{' '}
													{numberFormatter.format(field.value?.[1] ?? 0)}
													{field.value?.[1] === max ? '+' : ''}
												</div>
											</FormLabel>

											<div className="gap-sm mt-xl flex items-center">
												<span className="mr-md text-muted text-nowrap text-lg font-semibold">
													€ {numberFormatter.format(min)}
												</span>
												<FormControl>
													<Slider
														variant="accent"
														min={500}
														max={10000}
														step={100}
														defaultValue={[1500, 3000]}
														inputSize="lg"
														value={field.value}
														onValueChange={(value) => {
															field.onChange(value)
														}}
													>
														<SliderThumb />

														<SliderThumb />
													</Slider>
												</FormControl>
												<span className="ml-md text-muted text-nowrap text-lg font-semibold">
													€ {numberFormatter.format(max)}+
												</span>
											</div>
											<FormMessage />
										</FormItem>
									)
								}}
							/>
						) : null}
					</Fieldset>

					<Fieldset title={t('contact.fieldset.message')}>
						<FormField
							control={form.control}
							name="textMessage"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('contact.message')}</FormLabel>

									<FormControl>
										<Textarea inputSize="lg" rows={5} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</Fieldset>

					<Description>{t('contact.dataUsage')}</Description>

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

					{isSubmitted ? (
						<Alert variant="success" className="mt-lg">
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
							className="mt-md group w-full"
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
							<ArrowRightIcon className="ml-sm group-hover:translate-x-xs size-4 transition-all" />
						</Button>
					)}
				</div>
			</form>
		</Form>
	)
}

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
	LabelAsterisk,
	LoadingAnimation,
	PhoneInput,
	Slider,
	SliderThumb,
	Textarea,
} from '@nerdfish/ui'
import { useNumberFormatter } from '@react-aria/i18n'
import { env } from '@repo/env'
import { parseError } from '@repo/observability/error'
import { ArrowRightIcon } from '@repo/ui/icons'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { makeZodI18nMap } from '~/app/i18n/utils/zod-error-map'
import { useRecaptcha } from '../../hooks/recaptcha'
import { submitContactForm } from './actions'
import { type ContactFormData, contactSchema, projectTypes } from './validation'

function Fieldset({
	children,
	title,
}: {
	children: React.ReactNode
	title: string
}) {
	return (
		<fieldset className="mb-lg rounded-container">
			<H3 className="mb-lg">{title}</H3>
			<div className="space-y-lg">{children}</div>
		</fieldset>
	)
}

const BUDGET_RANGE = [500, 10000]

export function ContactForm() {
	const t = useTranslations('contact.form')
	const tZod = useTranslations('zod')
	const tFormFields = useTranslations('contact.form.fields.names')
	const tCustomErrors = useTranslations('contact.form.fields.errors')
	z.setErrorMap(makeZodI18nMap({ tZod, tFormFields, tCustomErrors }))

	const numberFormatter = useNumberFormatter({
		notation: 'compact',
	})
	const { execute } = useRecaptcha()
	const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false)
	const [error, setError] = React.useState<string>()

	const form = useForm<ContactFormData>({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			name: '',
			contact: {
				email: '',
				phone: '',
			},
			company: '',
			textMessage: '',
			projectType: [],
			budgetRange: [1500, 4000],
		},
	})

	async function onSubmit(data: ContactFormData) {
		try {
			setError(undefined)
			let recaptchaResponse: string | undefined

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
			else setError(t('fields.errors.generic'))
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
					<Fieldset title={t('sections.customer')}>
						<div className="flex w-full flex-col gap-md md:flex-row">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>
											{t('fields.labels.name')}
											<LabelAsterisk />
										</FormLabel>

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
										<FormLabel>{t('fields.labels.company')}</FormLabel>

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
							name="contact"
							render={() => (
								<FormItem>
									<FormLabel>
										{t('fields.labels.contactInformation')}
										<LabelAsterisk />
									</FormLabel>
									<div className="flex w-full flex-col items-start gap-md md:flex-row">
										<FormField
											control={form.control}
											name="contact.email"
											render={({ field }) => (
												<FormItem className="w-full">
													<FormLabel>
														<FormDescription>
															{t('fields.labels.email')}
														</FormDescription>
													</FormLabel>

													<FormControl>
														<Input inputSize="lg" type="email" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="contact.phone"
											render={({ field }) => (
												<FormItem className="w-full">
													<FormLabel>
														<FormDescription>
															{' '}
															{t('fields.labels.phone')}
														</FormDescription>
													</FormLabel>

													<FormControl>
														<PhoneInput
															inputSize="lg"
															className="w-full"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</FormItem>
							)}
						/>
					</Fieldset>

					<Fieldset title={t('sections.project')}>
						<FormField
							control={form.control}
							name="projectType"
							render={() => (
								<FormItem>
									<FormLabel>{t('fields.labels.projectType')}</FormLabel>
									<FormDescription>
										{t('fields.labels.projectTypeDescription')}
									</FormDescription>
									<div className="flex gap-sm">
										{projectTypes.map((type) => (
											<FormField
												key={type}
												control={form.control}
												name="projectType"
												render={({ field }) => {
													const checked = field.value.includes(type)

													return (
														<FormItem key={type}>
															<FormLabel
																aria-hidden
																className="flex items-center gap-sm rounded-container focus-within:outline-active"
															>
																<Button
																	asChild
																	aria-label={type}
																	variant={checked ? 'accent' : 'outline'}
																	className="inline cursor-pointer"
																>
																	<span>{type}</span>
																</Button>
															</FormLabel>
															<FormControl className="sr-only">
																<input
																	{...field}
																	type="checkbox"
																	aria-label={type}
																	checked={checked}
																	className="peer sr-only"
																	onChange={(e) => {
																		return e.target.checked
																			? field.onChange([...field.value, type])
																			: field.onChange(
																					field.value.filter(
																						(value) => value !== type
																					)
																				)
																	}}
																/>
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
												{t('fields.labels.budgetRange')}
												<FormDescription>
													{t('fields.labels.budgetRangeDescription')}
												</FormDescription>
												<div className="flex items-center justify-center pt-md font-semibold text-muted">
													€ {numberFormatter.format(field.value?.[0] ?? 0)} - €
													{numberFormatter.format(field.value?.[1] ?? 0)}
													{field.value?.[1] === max ? '+' : ''}
												</div>
											</FormLabel>

											<div className="mt-xl flex items-center gap-sm">
												<span className="mr-md text-nowrap font-semibold text-lg text-muted">
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
												<span className="ml-md text-nowrap font-semibold text-lg text-muted">
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

					<Fieldset title={t('sections.message')}>
						<FormField
							control={form.control}
							name="textMessage"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{t('fields.labels.textMessage')}
										<LabelAsterisk />
									</FormLabel>

									<FormControl>
										<Textarea inputSize="lg" rows={5} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</Fieldset>

					<Description>{t('dataUsage')}</Description>

					{form.formState.errors.recaptchaResponse?.message ? (
						<Alert variant="danger" className="mt-lg">
							<AlertTitle>reCAPTCHA error</AlertTitle>
							<AlertDescription>
								{t('fields.errors.recaptcha')}
							</AlertDescription>
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
								{t('success')}
								<span role="img" aria-label="party popper">
									🎉
								</span>
							</AlertDescription>
						</Alert>
					) : (
						<Button
							className="group mt-md w-full"
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
							{t('send')}
							<ArrowRightIcon className="ml-sm size-4 transition-all group-hover:translate-x-xs" />
						</Button>
					)}
				</div>
			</form>
		</Form>
	)
}

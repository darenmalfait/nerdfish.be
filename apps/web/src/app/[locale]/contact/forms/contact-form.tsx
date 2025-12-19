'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, AlertDescription, AlertTitle } from '@nerdfish/react/alert'
import { Button } from '@nerdfish/react/button'
import {
	Field,
	FieldGroup,
	FieldLabel,
	FieldError,
	FieldDescription,
} from '@nerdfish/react/field'
import { Input } from '@nerdfish/react/input'
import { LabelAsterisk } from '@nerdfish/react/label'
import { type CountryCode, PhoneInput } from '@nerdfish/react/phone-input'
import { Slider, SliderThumb } from '@nerdfish/react/slider'
import { Spinner } from '@nerdfish/react/spinner'
import { Textarea } from '@nerdfish/react/textarea'
import { useNumberFormatter } from '@react-aria/i18n'
import { ArrowRightIcon } from '@repo/design-system/icons'
import { useLocale, useTranslations } from '@repo/i18n/client'
import { useZodLocale } from '@repo/i18n/utils'
import { parseError } from '@repo/observability/error'
import { useRecaptcha } from '@repo/recaptcha/hooks/use-recaptcha'
import { useAction } from 'next-safe-action/hooks'
import { type ReactNode, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { submitContactFormAction } from './contact-form.actions'
import {
	type ContactFormData,
	contactFormSchema,
	projectTypes,
} from './contact-form.schema'

function Fieldset({ children, title }: { children: ReactNode; title: string }) {
	return (
		<fieldset className="mb-acquaintances rounded-container">
			<h3 className="typography-heading-sm mb-friends">{title}</h3>
			<div className="space-y-lg">{children}</div>
		</fieldset>
	)
}

const BUDGET_RANGE = [500, 10000]

export function ContactForm() {
	const locale = useLocale()
	useZodLocale(locale)

	const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
	const [error, setError] = useState<string>()

	const t = useTranslations('contact.form')

	const form = useForm<ContactFormData>({
		resolver: zodResolver(contactFormSchema),
		defaultValues: {
			name: '',
			contact: {
				email: '',
				phone: '',
			},
			vatNumber: '',
			company: '',
			textMessage: '',
			projectType: [],
			budgetRange: [1500, 4000],
		},
	})

	const submitContactForm = useAction(submitContactFormAction, {
		onSuccess: ({ data }) => {
			if (data.success) {
				setIsSubmitted(true)
				return form.reset()
			}

			if (data.error) setError(data.error)
			else setError(t('fields.errors.generic'))
		},
		onError: () => {
			setError('Something went wrong')
		},
	})
	const numberFormatter = useNumberFormatter({
		notation: 'compact',
	})
	const recaptcha = useRecaptcha()

	async function onSubmit(data: ContactFormData) {
		try {
			setError(undefined)
			const recaptchaResponse = await recaptcha.execute()

			return submitContactForm.execute({
				...data,
				recaptchaResponse,
			})
		} catch (e) {
			const errorMessage = parseError(e)
			setError(errorMessage)
		}
	}

	const selectedProjectTypes = form.watch('projectType')

	return (
		<form noValidate onSubmit={form.handleSubmit(onSubmit)}>
			<div>
				<Fieldset title={t('sections.customer')}>
					<FieldGroup>
						<div className="gap-friends flex w-full flex-col md:flex-row">
							<Controller
								control={form.control}
								name="name"
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor={field.name}>
											{t('fields.labels.name')} <LabelAsterisk />
										</FieldLabel>
										<Input
											id={field.name}
											size="lg"
											{...field}
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.invalid ? (
											<FieldError errors={[fieldState.error]} />
										) : null}
									</Field>
								)}
							/>
							<Controller
								control={form.control}
								name="company"
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor={field.name}>
											{t('fields.labels.company')}
										</FieldLabel>
										<Input
											id={field.name}
											size="lg"
											{...field}
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.invalid ? (
											<FieldError errors={[fieldState.error]} />
										) : null}
									</Field>
								)}
							/>
						</div>
						{form.watch('company') ? (
							<Controller
								control={form.control}
								name="vatNumber"
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor={field.name}>
											{t('fields.labels.vatNumber')}
										</FieldLabel>
										<Input
											id={field.name}
											size="lg"
											{...field}
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.invalid ? (
											<FieldError errors={[fieldState.error]} />
										) : null}
									</Field>
								)}
							/>
						) : null}
						<Controller
							control={form.control}
							name="contact"
							render={() => (
								<Field>
									<FieldLabel>
										{t('fields.labels.contactInformation')}
										<LabelAsterisk />
									</FieldLabel>
									<div className="gap-friends flex w-full flex-col items-start md:flex-row">
										<Controller
											control={form.control}
											name="contact.email"
											render={({ field, fieldState }) => (
												<Field data-invalid={fieldState.invalid}>
													<FieldLabel htmlFor={field.name}>
														{t('fields.labels.email')}
													</FieldLabel>
													<Input
														id={field.name}
														size="lg"
														type="email"
														{...field}
														aria-invalid={fieldState.invalid}
													/>
													{fieldState.invalid ? (
														<FieldError errors={[fieldState.error]} />
													) : null}
												</Field>
											)}
										/>
										<Controller
											control={form.control}
											name="contact.phone"
											render={({ field, fieldState }) => (
												<Field data-invalid={fieldState.invalid}>
													<FieldLabel htmlFor={field.name}>
														{t('fields.labels.phone')}
													</FieldLabel>
													<PhoneInput
														id={field.name}
														defaultCountry="BE"
														size="lg"
														className="w-full"
														{...field}
														value={field.value as CountryCode}
														aria-invalid={fieldState.invalid}
													/>
													{fieldState.invalid ? (
														<FieldError errors={[fieldState.error]} />
													) : null}
												</Field>
											)}
										/>
									</div>
								</Field>
							)}
						/>
					</FieldGroup>
				</Fieldset>

				<Fieldset title={t('sections.project')}>
					<FieldGroup>
						<Controller
							control={form.control}
							name="projectType"
							render={() => (
								<Field>
									<FieldLabel>{t('fields.labels.projectType')}</FieldLabel>
									<FieldDescription>
										{t('fields.labels.projectTypeDescription')}
									</FieldDescription>
									<div className="gap-best-friends flex w-full flex-row flex-wrap">
										{projectTypes.map((type) => (
											<Controller
												key={type}
												control={form.control}
												name="projectType"
												render={({ field, fieldState }) => {
													const checked = field.value.includes(type)

													return (
														<Field
															data-invalid={fieldState.invalid}
															className="w-fit"
														>
															<FieldLabel
																htmlFor={type}
																aria-hidden
																className="gap-best-friends rounded-container focus-within:outline-active flex items-center"
															>
																<Button
																	render={<span>{type}</span>}
																	aria-label={type}
																	size="sm"
																	variant={checked ? 'accent' : 'outline'}
																	className="inline cursor-pointer"
																/>
															</FieldLabel>
															<input
																id={type}
																{...field}
																type="checkbox"
																aria-label={type}
																checked={checked}
																aria-invalid={fieldState.invalid}
																className="peer sr-only"
																onChange={(e) => {
																	return e.target.checked
																		? field.onChange([...field.value, type])
																		: field.onChange(
																				field.value.filter(
																					(value) => value !== type,
																				),
																			)
																}}
															/>
															{fieldState.invalid ? (
																<FieldError errors={[fieldState.error]} />
															) : null}
														</Field>
													)
												}}
											/>
										))}
									</div>
								</Field>
							)}
						/>
						{selectedProjectTypes.includes('webdesign') ? (
							<Controller
								control={form.control}
								name="budgetRange"
								render={({ field, fieldState }) => {
									const [min = 0, max = 0] = BUDGET_RANGE

									return (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel>{t('fields.labels.budgetRange')}</FieldLabel>
											<FieldDescription>
												{t('fields.labels.budgetRangeDescription')}
											</FieldDescription>
											<div className="mt-friends text-foreground-muted flex items-center justify-center font-semibold">
												€ {numberFormatter.format(field.value?.[0] ?? 0)} - €
												{numberFormatter.format(field.value?.[1] ?? 0)}
												{field.value?.[1] === max ? '+' : ''}
											</div>

											<div className="gap-best-friends flex items-center">
												<span className="mr-friends text-foreground-muted text-base font-semibold text-nowrap">
													€ {numberFormatter.format(min)}
												</span>
												<Controller
													control={form.control}
													name="budgetRange"
													render={({ field: f }) => (
														<Slider
															min={500}
															max={10000}
															showTooltip={true}
															tooltipContent={(value) =>
																`€ ${numberFormatter.format(value)}`
															}
															step={100}
															aria-invalid={fieldState.invalid}
															defaultValue={[1500, 3000]}
															value={f.value}
															onValueChange={(value) => {
																f.onChange(value)
															}}
														>
															<SliderThumb />
															<SliderThumb />
														</Slider>
													)}
												/>
												<span className="ml-friends pr-friends text-foreground-muted text-base font-semibold text-nowrap">
													€ {numberFormatter.format(max)}+
												</span>
											</div>

											{fieldState.invalid ? (
												<FieldError errors={[fieldState.error]} />
											) : null}
										</Field>
									)
								}}
							/>
						) : null}
					</FieldGroup>
				</Fieldset>

				<Fieldset title={t('sections.message')}>
					<FieldGroup>
						<Controller
							control={form.control}
							name="textMessage"
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel htmlFor={field.name}>
										{t('fields.labels.textMessage')} <LabelAsterisk />
									</FieldLabel>
									<Textarea
										id={field.name}
										size="lg"
										rows={5}
										{...field}
										aria-invalid={fieldState.invalid}
									/>
									{fieldState.invalid ? (
										<FieldError errors={[fieldState.error]} />
									) : null}
								</Field>
							)}
						/>
					</FieldGroup>
				</Fieldset>

				<p className="typography-body-sm text-foreground-muted">
					{t('dataUsage')}
				</p>

				{form.formState.errors.recaptchaResponse?.message ? (
					<Alert variant="destructive" className="mt-casual">
						<AlertTitle>reCAPTCHA error</AlertTitle>
						<AlertDescription>{t('fields.errors.recaptcha')}</AlertDescription>
					</Alert>
				) : null}

				{error ? (
					<Alert variant="destructive" className="mt-casual">
						<AlertTitle>Error</AlertTitle>
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				) : null}

				{isSubmitted ? (
					<Alert variant="success" className="mt-casual">
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
						className="mt-friends group w-full"
						size="lg"
						disabled={
							form.formState.isSubmitting ||
							(form.formState.isSubmitSuccessful && !error)
						}
						type="submit"
					>
						{form.formState.isSubmitting ? (
							<Spinner className="mr-best-friends size-4" />
						) : null}
						{t('send')}
						<ArrowRightIcon className="ml-best-friends group-hover:translate-x-bff size-4 transition-all" />
					</Button>
				)}
			</div>
		</form>
	)
}

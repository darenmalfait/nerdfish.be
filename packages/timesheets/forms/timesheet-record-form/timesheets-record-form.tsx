'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nerdfish/react/button'
import {
	FieldGroup,
	Field,
	FieldLabel,
	FieldError,
} from '@nerdfish/react/field'
import { Input } from '@nerdfish/react/input'
import { Spinner } from '@nerdfish/react/spinner'
import { Textarea } from '@nerdfish/react/textarea'
import { TimeRangeInput } from '@repo/calendar/components/time-range-input'
import { parse, differenceInSeconds, NEW_EVENT_ID } from '@repo/calendar/utils'
import { cn } from '@repo/lib/utils/class'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
	timesheetsRecordFormSchema,
	type TimesheetsRecordFormData,
} from './timesheets-record-form.schema'

interface TimesheetsRecordFormProps {
	defaultValues?: TimesheetsRecordFormData
	onSubmit?: (data: TimesheetsRecordFormData) => void
	className?: string
}

export function TimesheetsRecordForm({
	defaultValues,
	onSubmit,
	className,
}: TimesheetsRecordFormProps) {
	const { id, start, end, description, project } = defaultValues ?? {}

	const form = useForm<TimesheetsRecordFormData>({
		resolver: zodResolver(timesheetsRecordFormSchema),
		defaultValues: defaultValues ?? {
			duration: 0,
			project: '',
			start: '',
			end: '',
		},
	})

	useEffect(() => {
		if (id && id !== NEW_EVENT_ID) {
			form.setValue('id', id, { shouldValidate: true })
		}

		if (id === NEW_EVENT_ID) {
			form.setValue('id', undefined)
		}

		if (start) {
			form.setValue('start', start)
		}
		if (end) {
			form.setValue('end', end)
		}

		if (project) {
			form.setValue('project', project, { shouldValidate: true })
		}

		if (description) {
			form.setValue('description', description)
		}

		if (start && end) {
			const startDate = parse(start, 'HH:mm', new Date())
			const endDate = parse(end, 'HH:mm', new Date())

			const durationInSeconds = differenceInSeconds(endDate, startDate)

			if (durationInSeconds) {
				form.setValue('duration', durationInSeconds, { shouldValidate: true })
			}
		}
	}, [defaultValues, description, end, form, id, project, start])

	function handleSubmit(data: TimesheetsRecordFormData) {
		onSubmit?.(data)
	}

	const isUpdate = id && id !== NEW_EVENT_ID

	return (
		<form
			noValidate
			onSubmit={form.handleSubmit(handleSubmit)}
			className={cn('gap-casual flex flex-col', className)}
		>
			<FieldGroup>
				<Controller
					control={form.control}
					name="duration"
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel>Duration</FieldLabel>
							<TimeRangeInput
								value={{ start: form.watch('start'), end: form.watch('end') }}
								onChange={(value) => {
									form.setValue('start', value.start)
									form.setValue('end', value.end)

									if (value.start && value.end) {
										const startDate = parse(value.start, 'HH:mm', new Date())
										const endDate = parse(value.end, 'HH:mm', new Date())

										const durationInSeconds = differenceInSeconds(
											endDate,
											startDate,
										)

										field.onChange(durationInSeconds)
									}
								}}
							/>
							{fieldState.invalid ? (
								<FieldError errors={[fieldState.error]} />
							) : null}
						</Field>
					)}
				/>
				<Controller
					control={form.control}
					name="project"
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel>Project</FieldLabel>
							<Input {...field} placeholder="Project" />
							{fieldState.invalid ? (
								<FieldError errors={[fieldState.error]} />
							) : null}
						</Field>
					)}
				/>
				<Controller
					control={form.control}
					name="description"
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel>Description</FieldLabel>
							<Textarea
								placeholder="Description"
								{...field}
								rows={3}
								className="resize-none"
							/>
							{fieldState.invalid ? (
								<FieldError errors={[fieldState.error]} />
							) : null}
						</Field>
					)}
				/>
			</FieldGroup>

			<div className="flex justify-between">
				<Button
					className="flex w-full items-center"
					disabled={form.formState.isSubmitting}
					type="submit"
				>
					{form.formState.isSubmitting ? (
						<Spinner className="mr-best-friends size-4" />
					) : null}
					{isUpdate ? 'Update' : 'Add'}
				</Button>
			</div>
		</form>
	)
}

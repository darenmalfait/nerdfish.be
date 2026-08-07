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
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
	timesheetsRecordFormSchema,
	type TimesheetsRecordFormData,
} from './timesheets-record-form.schema'

interface TimesheetsRecordFormProps {
	defaultValues?: TimesheetsRecordFormData
	onSubmit?: (data: TimesheetsRecordFormData) => void
	onTimeChange?: (start: string, end: string) => void
	className?: string
}

function getFormDefaultValues(
	defaultValues?: TimesheetsRecordFormData,
): TimesheetsRecordFormData {
	if (!defaultValues) {
		return {
			duration: 0,
			project: '',
			start: '',
			end: '',
		}
	}

	const { id, start, end, description, project, duration } = defaultValues

	let resolvedDuration = duration
	if (start && end) {
		const durationInSeconds = differenceInSeconds(
			parse(end, 'HH:mm', new Date()),
			parse(start, 'HH:mm', new Date()),
		)
		if (durationInSeconds) resolvedDuration = durationInSeconds
	}

	return {
		id: id && id !== NEW_EVENT_ID ? id : undefined,
		start,
		end,
		project: project ?? '',
		description,
		duration: resolvedDuration,
	}
}

export function TimesheetsRecordForm({
	defaultValues,
	onSubmit,
	onTimeChange,
	className,
}: TimesheetsRecordFormProps) {
	// Sync when calendar selection/drag updates times (same NEW_EVENT_ID key won't remount)
	const formValues = useMemo(
		() => getFormDefaultValues(defaultValues),
		// Primitive fields only — avoid resetting on new defaultValues object identity
		// eslint-disable-next-line react-hooks/exhaustive-deps -- sync on field values
		[
			defaultValues?.id,
			defaultValues?.start,
			defaultValues?.end,
			defaultValues?.project,
			defaultValues?.description,
			defaultValues?.duration,
		],
	)

	const form = useForm<TimesheetsRecordFormData>({
		resolver: zodResolver(timesheetsRecordFormSchema),
		defaultValues: formValues,
		values: formValues,
	})

	function handleSubmit(data: TimesheetsRecordFormData) {
		onSubmit?.(data)
	}

	const isUpdate =
		defaultValues?.id != null && defaultValues.id !== NEW_EVENT_ID

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
										onTimeChange?.(value.start, value.end)
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

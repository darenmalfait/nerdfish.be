'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { TimeRangeInput } from '@repo/calendar/components/time-range-input'
import { NEW_EVENT_ID } from '@repo/calendar/utils'
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
} from '@repo/design-system/components/ui'
import { cx } from '@repo/lib/utils/base'
import { parse, differenceInSeconds } from '@repo/lib/utils/date'
import * as React from 'react'
import { useForm } from 'react-hook-form'
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
	const { id, start, end, project, description } = defaultValues ?? {}

	const form = useForm<TimesheetsRecordFormData>({
		resolver: zodResolver(timesheetsRecordFormSchema),
		defaultValues: defaultValues ?? {
			duration: 0,
			project: '',
			start: '',
			end: '',
		},
	})

	React.useEffect(() => {
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
		<Form {...form}>
			<form
				noValidate
				onSubmit={form.handleSubmit(handleSubmit)}
				className={cx('gap-lg flex flex-col', className)}
			>
				<FormField
					control={form.control}
					name="duration"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Duration</FormLabel>
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
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="project"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Project</FormLabel>
							<FormControl>
								<Input placeholder="Project" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input placeholder="Description" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex justify-between">
					<Button
						className="w-full"
						disabled={form.formState.isSubmitting}
						type="submit"
					>
						{isUpdate ? 'Update' : 'Add'}
					</Button>
				</div>
			</form>
		</Form>
	)
}

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { TimeRangeInput } from '@repo/calendar/components/time-range-input'
import { parse, differenceInSeconds, NEW_EVENT_ID } from '@repo/calendar/utils'
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	LoadingAnimation,
	Textarea,
} from '@repo/design-system/components/ui'
import { cx } from '@repo/lib/utils/base'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { type TimesheetsProject } from '../schemas'
import {
	timesheetsRecordFormSchema,
	type TimesheetsRecordFormData,
} from './timesheets-record-form.schema'
import { TimesheetsSelectProject } from './timesheets-select-project'

interface TimesheetsRecordFormProps {
	defaultValues?: TimesheetsRecordFormData
	onSubmit?: (data: TimesheetsRecordFormData) => void
	projects: TimesheetsProject[]
	className?: string
}

export function TimesheetsRecordForm({
	defaultValues,
	onSubmit,
	className,
}: TimesheetsRecordFormProps) {
	const { id, start, end, description, projectId } = defaultValues ?? {}

	const form = useForm<TimesheetsRecordFormData>({
		resolver: zodResolver(timesheetsRecordFormSchema),
		defaultValues: defaultValues ?? {
			duration: 0,
			projectId: '',
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

		if (projectId) {
			form.setValue('projectId', projectId, { shouldValidate: true })
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
	}, [defaultValues, description, end, form, id, projectId, start])

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
					name="projectId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Project</FormLabel>
							<FormControl>
								<TimesheetsSelectProject {...field} placeholder="Project" />
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
								<Textarea
									placeholder="Description"
									{...field}
									rows={3}
									className="resize-none"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex justify-between">
					<Button
						className="flex w-full items-center"
						disabled={form.formState.isSubmitting}
						type="submit"
					>
						{form.formState.isSubmitting ? (
							<LoadingAnimation variant="classic" className="mr-sm size-4" />
						) : null}
						{isUpdate ? 'Update' : 'Add'}
					</Button>
				</div>
			</form>
		</Form>
	)
}

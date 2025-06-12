'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
	Button,
	Collapsible,
	CollapsibleContent,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	LoadingAnimation,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Switch,
	Textarea,
} from '@repo/design-system/components/ui'
import { cx } from '@repo/lib/utils/base'
import { uniqueCurrencies } from '@repo/location/currencies'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { type TimesheetsProject } from '../../schemas'
import {
	timesheetsProjectFormSchema,
	type TimesheetsProjectFormData,
} from './timesheets-project-form.schema'

interface TimesheetsProjectFormProps {
	defaultValues?: TimesheetsProjectFormData
	onSubmit?: (data: TimesheetsProjectFormData) => void
	projects: TimesheetsProject[]
	className?: string
}

export function TimesheetsProjectForm({
	defaultValues,
	onSubmit,
	className,
}: TimesheetsProjectFormProps) {
	const [advancedSettingsOpen, setAdvancedSettingsOpen] = React.useState(false)
	const form = useForm<TimesheetsProjectFormData>({
		resolver: zodResolver(timesheetsProjectFormSchema),
		defaultValues: defaultValues ?? {
			name: '',
			description: '',
			billable: true,
			rate: 0,
			currency: 'EUR',
			status: 'in_progress',
		},
	})

	function handleSubmit(data: TimesheetsProjectFormData) {
		onSubmit?.(data)
	}

	const isUpdate = !!defaultValues?.id

	return (
		<Form {...form}>
			<form
				noValidate
				onSubmit={form.handleSubmit(handleSubmit)}
				className={cx('gap-lg flex flex-col', className)}
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="Name" {...field} />
							</FormControl>
							<FormDescription>
								This is the project display name.
							</FormDescription>
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
							<FormDescription>
								Add a short description about the project.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="status"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Status</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="in_progress">In Progress</SelectItem>
									<SelectItem value="completed">Completed</SelectItem>
								</SelectContent>
							</Select>

							<FormMessage />
						</FormItem>
					)}
				/>

				<Collapsible open={advancedSettingsOpen}>
					<FormItem className="flex items-center justify-between">
						<FormLabel>Billable</FormLabel>

						<FormField
							control={form.control}
							name="billable"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={(value) => {
												setAdvancedSettingsOpen((prev) => !prev)
												field.onChange(value)
											}}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</FormItem>

					<CollapsibleContent className="space-y-lg w-full">
						<div className="space-x-md mt-md flex">
							<FormField
								control={form.control}
								name="rate"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Hourly Rate</FormLabel>
										<FormControl>
											<Input type="number" min={0} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="currency"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Currency</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue />
												</SelectTrigger>
											</FormControl>
											<SelectContent className="max-h-[300px]">
												{uniqueCurrencies.map((currency) => (
													<SelectItem value={currency} key={currency}>
														{currency}
													</SelectItem>
												))}
											</SelectContent>
										</Select>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</CollapsibleContent>
				</Collapsible>

				<div className="flex justify-between">
					<Button
						className="flex w-full items-center"
						disabled={form.formState.isSubmitting}
						type="submit"
					>
						{form.formState.isSubmitting ? (
							<LoadingAnimation className="mr-sm size-4" />
						) : null}
						{isUpdate ? 'Update' : 'Add'}
					</Button>
				</div>
			</form>
		</Form>
	)
}

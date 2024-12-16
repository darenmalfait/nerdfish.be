import { zodResolver } from '@hookform/resolvers/zod'
import {
	Button,
	DateTimePicker,
	FormMessage,
	Input,
	FormControl,
	FormItem,
	FormLabel,
	FormField,
	Form,
} from '@repo/design-system/components/ui'
import { useForm } from 'react-hook-form'
import { getCrypto, timeEntrySchema, type TimeEntry } from '../utils'

export function TimeEntryForm({
	initialValues,
	onSubmit,
}: {
	initialValues?: TimeEntry
	onSubmit: (data: TimeEntry) => void
}) {
	const form = useForm<TimeEntry>({
		resolver: zodResolver(timeEntrySchema),
		defaultValues: initialValues ?? {
			id: getCrypto().randomUUID(),
			project: '',
			day: new Date(),
			hours: 8,
		},
	})

	return (
		<Form {...form}>
			<form noValidate onSubmit={form.handleSubmit(onSubmit)}>
				<fieldset className="space-y-md">
					<FormField
						control={form.control}
						name="project"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Project</FormLabel>

								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="day"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Day</FormLabel>
								<FormControl>
									<DateTimePicker {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="hours"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Hours</FormLabel>
								<FormControl>
									<Input type="number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit">Add</Button>
				</fieldset>
			</form>
		</Form>
	)
}

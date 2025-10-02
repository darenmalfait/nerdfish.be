'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { JsonEditor } from '@repo/design-system/components/json-editor'
import {
	Button,
	TooltipContent,
	TooltipTrigger,
	Tooltip,
	TooltipProvider,
	Form,
	FormField,
	FormLabel,
	LabelAsterisk,
	FormItem,
	FormControl,
	FormMessage,
	Sheet,
	SheetTrigger,
	SheetContent,
	SheetTitle,
} from '@repo/design-system/components/ui'
import { PencilIcon, PrinterIcon } from '@repo/design-system/icons'
import { cx } from '@repo/lib/utils/base'
import { parseError } from '@repo/observability/error'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useResume } from '../resume-provider'
import { resumeSchema } from '../types'
import { useTheme } from '~/app/theme/theme-provider'

const resumeFormSchema = z.object({
	schema: z.string(),
})

type ResumeFormData = z.infer<typeof resumeFormSchema>

function EditResumeForm({
	onSubmit: onSubmitProp,
}: {
	onSubmit: (data: ResumeFormData) => void
}) {
	const { theme } = useTheme()
	const { resume, setResume } = useResume()
	const form = useForm<ResumeFormData>({
		resolver: zodResolver(resumeFormSchema),
		defaultValues: {
			schema: JSON.stringify(resume),
		},
	})

	async function onSubmit(data: ResumeFormData) {
		try {
			const newResume = JSON.parse(data.schema)
			const { success, error } = resumeSchema.safeParse(newResume)

			if (!success) {
				form.setError('schema', { message: error.message })
				return
			}

			setResume(newResume)
			onSubmitProp(data)
		} catch (e) {
			const errorMessage = parseError(e)
			form.setError('schema', { message: errorMessage })
		}
	}

	return (
		<Form {...form}>
			<form
				noValidate
				onSubmit={form.handleSubmit(onSubmit)}
				className="gap-lg flex flex-1 flex-col justify-between"
			>
				<FormField
					control={form.control}
					name="schema"
					render={({ field }) => (
						<FormItem className="h-full w-full flex-1">
							<FormLabel>
								JSON Schema
								<LabelAsterisk />
							</FormLabel>

							<FormControl>
								<JsonEditor
									className="h-[82dvh] overflow-y-auto"
									theme={theme === 'light' ? 'light' : 'dark'}
									data={JSON.parse(field.value)}
									setData={(data) => field.onChange(JSON.stringify(data))}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="sticky bottom-0">
					Save Changes
				</Button>
			</form>
		</Form>
	)
}

export function ResumeToolbar() {
	const [isImporting, setIsImporting] = useState(false)

	return (
		<div
			className={cx(
				'print:hidden',
				'rounded-container bg-popover p-xs fixed inset-x-0 z-50 mx-auto w-fit max-w-full',
				'before:empty-content before:rounded-container before:bg-background-muted/50 before:absolute before:inset-0',
				'bottom-lg',
			)}
		>
			<TooltipProvider>
				<ul className="gap-sm flex">
					<li>
						<Tooltip>
							<Sheet open={isImporting} onOpenChange={setIsImporting}>
								<SheetTrigger asChild>
									<TooltipTrigger asChild>
										<Button type="button" icon aria-label="Import">
											<PencilIcon className="h-4 w-4" />
										</Button>
									</TooltipTrigger>
								</SheetTrigger>
								<SheetContent className="pb-lg sm:max-w-screen-md">
									<div className="h-full w-full flex-1">
										<SheetTitle>Edit JSON</SheetTitle>
										<EditResumeForm
											onSubmit={() => {
												setIsImporting(false)
											}}
										/>
									</div>
								</SheetContent>
							</Sheet>
							<TooltipContent>Edit JSON</TooltipContent>
						</Tooltip>
					</li>
					<li>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									type="button"
									variant="ghost"
									icon
									aria-label="Print"
									onClick={() => window.print()}
								>
									<PrinterIcon className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>Print Resume</TooltipContent>
						</Tooltip>
					</li>
				</ul>
			</TooltipProvider>
		</div>
	)
}

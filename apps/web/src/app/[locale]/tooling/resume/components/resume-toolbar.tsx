'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nerdfish/react/button'
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@nerdfish/react/field'

import {
	Sheet,
	SheetTrigger,
	SheetContent,
	SheetTitle,
} from '@nerdfish/react/sheet'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider,
} from '@nerdfish/react/tooltip'
import { JsonEditor } from '@repo/design-system/components/json-editor'
import { PencilIcon, PrinterIcon } from '@repo/design-system/icons'
import { cn } from '@repo/lib/utils/class'
import { parseError } from '@repo/observability/error'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
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
		<form
			noValidate
			onSubmit={form.handleSubmit(onSubmit)}
			className="gap-casual flex flex-1 flex-col justify-between"
		>
			<FieldGroup>
				<Controller
					name="schema"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel>Json Schema</FieldLabel>
							<JsonEditor
								className="h-[82dvh] overflow-y-auto"
								theme={theme === 'light' ? 'light' : 'dark'}
								data={JSON.parse(field.value)}
								setData={(data) => field.onChange(JSON.stringify(data))}
							/>
							{fieldState.invalid ? (
								<FieldError errors={[fieldState.error]} />
							) : null}
						</Field>
					)}
				/>
			</FieldGroup>

			<Button type="submit" className="sticky bottom-0">
				Save Changes
			</Button>
		</form>
	)
}

export function ResumeToolbar() {
	const [isImporting, setIsImporting] = useState(false)

	return (
		<div
			className={cn(
				'print:hidden',
				'rounded-container bg-popover p-bff fixed inset-x-0 z-50 mx-auto w-fit max-w-full',
				'before:empty-content before:rounded-container before:bg-background-muted/50 before:absolute before:inset-0',
				'bottom-lg',
			)}
		>
			<TooltipProvider>
				<ul className="gap-best-friends flex">
					<li>
						<Tooltip>
							<Sheet open={isImporting} onOpenChange={setIsImporting}>
								<Button
									type="button"
									icon
									aria-label="Import"
									render={
										<SheetTrigger
											render={
												<TooltipTrigger>
													<PencilIcon className="h-4 w-4" />
												</TooltipTrigger>
											}
										/>
									}
								/>

								<SheetContent className="pb-lg sm:max-w-screen-3xl">
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
							<TooltipTrigger
								render={
									<Button
										type="button"
										variant="ghost"
										icon
										aria-label="Print"
										onClick={() => window.print()}
									>
										<PrinterIcon className="h-4 w-4" />
									</Button>
								}
							/>
							<TooltipContent>Print Resume</TooltipContent>
						</Tooltip>
					</li>
				</ul>
			</TooltipProvider>
		</div>
	)
}

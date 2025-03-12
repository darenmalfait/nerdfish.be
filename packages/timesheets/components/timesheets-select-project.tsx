'use client'

import {
	type AutocompleteOption,
	Command,
	CommandInput,
	CommandList,
	type Input,
	useControllableState,
	CommandGroup,
	CommandItem,
	CommandEmpty,
	EmptyState,
	EmptyStateDescription,
	toast,
} from '@repo/design-system/components/ui'
import { CheckIcon } from '@repo/design-system/icons'
import { cx } from '@repo/lib/utils/base'
import * as React from 'react'
import { useTimesheets } from '../providers/timesheets-provider'

interface TimesheetsSelectProjectProps
	extends Omit<
		React.ComponentProps<typeof Input>,
		'onSelect' | 'value' | 'defaultValue' | 'onChange'
	> {
	value?: string
	defaultValue?: string
	onChange?: (value: string) => void
}

export function TimesheetsSelectProject({
	value: valueProp,
	defaultValue,
	onChange: onChangeProp,
	disabled,
	ref,
	...props
}: TimesheetsSelectProjectProps) {
	const { projects, onCreateProject } = useTimesheets()

	const options = projects.map((project) => ({
		label: project.name,
		value: project.id,
	}))

	const inputRef = React.useRef<HTMLInputElement>(null)

	const [value, setValue] = useControllableState(
		valueProp,
		defaultValue ?? '',
		onChangeProp,
	)

	const [inputValue, setInputValue] = React.useState<string>(
		options.find((option) => option.value === value)?.label ?? '',
	)

	const [isOpen, setOpen] = React.useState(false)

	React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

	const handleKeyDown = React.useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			const input = inputRef.current
			if (!input) return

			// Keep the options displayed when the user is typing
			if (!isOpen) setOpen(true)

			// This is not a default behaviour of the <input /> field
			if (event.key === 'Enter' && input.value !== '') {
				const optionToSelect = options.find(
					(option) => option.value === input.value,
				)

				if (optionToSelect) setValue(optionToSelect.value)
			}

			if (event.key === 'Escape') {
				input.blur()
			}
		},
		[isOpen, options, setValue],
	)

	const handleSelectOption = React.useCallback(
		(selectedOption: AutocompleteOption) => {
			setInputValue(selectedOption.label)
			setValue(selectedOption.value)

			// This is a hack to prevent the input from being focused after the user selects an option
			// We can call this hack: "The next tick"
			setTimeout(() => {
				inputRef.current?.blur()
			}, 0)

			setOpen(false)
		},
		[setValue],
	)

	return (
		<Command onKeyDown={handleKeyDown}>
			<div>
				<CommandInput
					{...props}
					ref={inputRef}
					value={inputValue}
					onValueChange={setInputValue}
					onFocus={() => setOpen(true)}
					disabled={disabled}
				/>
			</div>
			<div className="mr-sm relative">
				<CommandList>
					<div
						className={cx(
							'animate-in rounded-base bg-popover p-sm text-foreground shadow-outline absolute top-0 z-10 w-full shadow-md outline-none',
							isOpen ? 'block' : 'hidden',
						)}
					>
						{options.length > 0 ? (
							<CommandGroup className="h-full overflow-auto">
								{options.map((option) => {
									const isSelected = value === option.value

									return (
										<CommandItem
											key={option.value}
											value={option.label}
											onMouseDown={(event) => {
												event.preventDefault()
												event.stopPropagation()
											}}
											onSelect={() => handleSelectOption(option)}
											className={cx(
												'gap-sm flex w-full items-center',
												isSelected ? null : 'pl-lg',
											)}
										>
											{isSelected ? <CheckIcon className="w-4" /> : null}
											{option.label}
										</CommandItem>
									)
								})}
							</CommandGroup>
						) : null}

						{!!inputValue.trim() &&
						!options.find(
							(o) => o.label.toLowerCase() === inputValue.toLowerCase(),
						) ? (
							<CommandGroup>
								<CommandItem
									key={inputValue}
									value={inputValue}
									onSelect={async () => {
										const result = await onCreateProject({
											name: inputValue,
										})

										if (!result.success || !result.data)
											return toast.error(
												result.error ?? 'Unknown error on creating project',
											)

										const { name, id } = result.data

										return handleSelectOption({
											label: name,
											value: id,
										})
									}}
								>
									{`Create "${inputValue}"`}
								</CommandItem>
							</CommandGroup>
						) : null}

						<CommandEmpty className="m-0">
							<EmptyState>
								<EmptyStateDescription>No projects found</EmptyStateDescription>
							</EmptyState>
						</CommandEmpty>
					</div>
				</CommandList>
			</div>
		</Command>
	)
}

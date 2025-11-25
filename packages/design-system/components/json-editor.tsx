'use client'

import { inputVariants } from '@nerdfish/react/input'
import { cn } from '@repo/lib/utils/class'
import {
	githubDarkTheme,
	githubLightTheme,
	type JsonEditorProps,
	JsonEditor as JsonEditorReact,
} from 'json-edit-react'
import {
	CheckIcon,
	ChevronRightIcon,
	CopyIcon,
	MinusIcon,
	PencilIcon,
	PlusIcon,
	XIcon,
} from '../icons'

export function JsonEditor({
	className,
	theme: themeProp = 'light',
	...props
}: JsonEditorProps & { theme?: 'light' | 'dark' }) {
	const theme = themeProp === 'light' ? githubLightTheme : githubDarkTheme

	return (
		<JsonEditorReact
			theme={[theme]}
			className={cn(inputVariants(), 'h-full w-full max-w-none!', className)}
			icons={{
				add: <PlusIcon className="text-foreground h-4 w-4" />,
				delete: <MinusIcon className="text-foreground-danger h-4 w-4" />,
				edit: <PencilIcon className="text-foreground h-4 w-4" />,
				cancel: <XIcon className="text-foreground-muted h-4 w-4" />,
				chevron: <ChevronRightIcon className="text-foreground h-4 w-4" />,
				copy: <CopyIcon className="text-foreground h-4 w-4" />,
				ok: <CheckIcon className="text-foreground-success h-4 w-4" />,
			}}
			{...props}
		/>
	)
}

'use client'

import { CheckIcon, CopyIcon } from '../icons'
import {
	Button,
	type ButtonProps,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	useCopyToClipboard,
} from './ui'

const COPY_TIMOUT = 3000

export interface CopyButtonProps extends ButtonProps {
	code: string
}

export function CopyButton({ code, className, ...props }: CopyButtonProps) {
	const { handleCopy, copiedText } = useCopyToClipboard()

	const label = copiedText ? 'Copied' : 'Copy'

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					size="iconSm"
					aria-label="copy"
					{...props}
					className={className}
					variant={copiedText ? 'success' : 'secondary'}
					onClick={() => handleCopy(code, COPY_TIMOUT)}
				>
					{copiedText ? (
						<CheckIcon className="size-4" />
					) : (
						<CopyIcon className="size-4" />
					)}
				</Button>
			</TooltipTrigger>
			<TooltipContent side="left">{label}</TooltipContent>
		</Tooltip>
	)
}

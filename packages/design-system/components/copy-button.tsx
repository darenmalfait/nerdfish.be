'use client'

import { cx } from '@repo/lib/utils/base'
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
					icon
					size="sm"
					aria-label="copy"
					{...props}
					className={cx(className, 'size-8')}
					variant={copiedText ? 'success' : 'secondary'}
					onClick={() => handleCopy(code, COPY_TIMOUT)}
				>
					{copiedText ? (
						<CheckIcon className="!size-3" />
					) : (
						<CopyIcon className="!size-3" />
					)}
				</Button>
			</TooltipTrigger>
			<TooltipContent side="left">{label}</TooltipContent>
		</Tooltip>
	)
}

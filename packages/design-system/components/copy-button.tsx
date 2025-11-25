'use client'

import { Button, type ButtonProps } from '@nerdfish/react/button'
import { useCopyToClipboard } from '@nerdfish/react/hooks/use-copy-to-clipboard'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@nerdfish/react/tooltip'
import { cn } from '@repo/lib/utils/class'
import { CheckIcon, CopyIcon } from '../icons'

const COPY_TIMOUT = 3000

export interface CopyButtonProps extends ButtonProps {
	code: string
}

export function CopyButton({ code, className, ...props }: CopyButtonProps) {
	const { handleCopy, copiedText } = useCopyToClipboard()

	const label = copiedText ? 'Copied' : 'Copy'

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger
					render={
						<Button
							icon
							size="sm"
							aria-label="copy"
							{...props}
							className={cn(className, 'size-8')}
							variant={copiedText ? 'success' : 'secondary'}
							onClick={() => handleCopy(code, COPY_TIMOUT)}
						>
							{copiedText ? (
								<CheckIcon className="size-3!" />
							) : (
								<CopyIcon className="size-3!" />
							)}
						</Button>
					}
				/>
				<TooltipContent side="left">{label}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

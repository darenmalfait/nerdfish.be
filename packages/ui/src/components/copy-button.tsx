'use client'

import {
	Button,
	type ButtonProps,
	Tooltip,
	TooltipProvider,
	TooltipTrigger,
	TooltipContent,
	useCopyToClipboard,
} from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import React from 'react'
import { Icons } from '../icons'

const COPY_TIMOUT = 3000

export function CopyButton({
	code,
	className,
	...props
}: ButtonProps & {
	code: string
}) {
	const { handleCopy, copiedText } = useCopyToClipboard()

	const label = copiedText ? 'Copied' : 'Copy'

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						size="iconSm"
						{...props}
						className={cx('absolute right-2 top-2', className)}
						variant={copiedText ? 'success' : 'ghost'}
						aria-label="copy"
						onClick={() => handleCopy(code, COPY_TIMOUT)}
					>
						{copiedText ? (
							<Icons.Check className="size-4" />
						) : (
							<Icons.Copy className="size-4" />
						)}
					</Button>
				</TooltipTrigger>
				<TooltipContent>{label}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

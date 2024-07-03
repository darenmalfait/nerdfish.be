'use client'

import { cx } from '@nerdfish/utils'
import { copyToClipboardWithMeta } from '@nerdfish-website/lib/utils'
import { Check, Copy } from 'lucide-react'
import * as React from 'react'

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
	value: string
	src?: string
}

export function CopyButton({
	value,
	className,
	src,
	...props
}: CopyButtonProps) {
	const [hasCopied, setHasCopied] = React.useState(false)

	React.useEffect(() => {
		setTimeout(() => {
			setHasCopied(false)
		}, 2000)
	}, [hasCopied])

	return (
		<button
			className={cx(
				'bg-background hover:bg-muted relative z-20 inline-flex h-6 w-6 items-center justify-center rounded-md border text-sm font-medium transition-all focus:outline-none',
				className,
			)}
			onClick={async () => {
				await copyToClipboardWithMeta(value)
				setHasCopied(true)
			}}
			{...props}
		>
			<span className="sr-only">Copy</span>
			{hasCopied ? (
				<Check className="size-3 text-white" />
			) : (
				<Copy className="size-3 text-white" />
			)}
		</button>
	)
}

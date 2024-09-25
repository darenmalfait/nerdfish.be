'use client'

import { Button } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { Icons } from '@nerdfish-website/ui/icons'
import * as React from 'react'
import slugify from 'slugify'

export function PortableHeading({
	children,
	type,
}: {
	children?: React.ReactElement
	type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}) {
	const [hasCopied, setHasCopied] = React.useState(false)

	React.useEffect(() => {
		setTimeout(() => {
			setHasCopied(false)
		}, 2000)
	}, [hasCopied])

	if (!children) return null

	const textNode = children.props.content.find(
		(node: any) => node.type === 'text',
	)

	const Heading = type
	const id = textNode?.text
		? slugify(textNode.text, { lower: true })
		: undefined

	return (
		<Heading id={id} className="group flex items-center">
			{children}
			{type === 'h2' && id ? (
				<Button
					variant="ghost"
					size="iconSm"
					className={cx(
						'text-accent ml-2 hidden group-hover:flex',
						hasCopied && 'flex',
					)}
					onClick={async () => {
						const url = `${window.location.origin}${window.location.pathname}#${id}`
						await navigator.clipboard.writeText(url)
						setHasCopied(true)
					}}
					aria-label="Link to this section"
				>
					<span className="sr-only">Copy</span>
					{hasCopied ? (
						<Icons.Check className="text-success size-4" />
					) : (
						<Icons.Link className="size-4" />
					)}
				</Button>
			) : null}
		</Heading>
	)
}

'use client'

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

	// biome-ignore lint/correctness/useExhaustiveDependencies: intentional
	React.useEffect(() => {
		setTimeout(() => {
			setHasCopied(false)
		}, 2000)
	}, [hasCopied])

	if (!children) return null

	const textNode = children.props.content.find(
		// biome-ignore lint/suspicious/noExplicitAny: not sure how to type this
		(node: any) => node.type === 'text'
	)

	const Heading = type
	const id = textNode?.text
		? slugify(textNode.text, { lower: true })
		: undefined

	return (
		<Heading id={id} className="group flex items-center">
			{children}
		</Heading>
	)
}

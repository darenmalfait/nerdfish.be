import { CopyButton } from '@repo/design-system/components/copy-button'
import {
	CodeBlock,
	CodeBlockCode,
	CodeBlockGroup,
} from '@repo/design-system/components/ui'
import * as React from 'react'

type PortableCodeProps = React.ComponentProps<'pre'>

function PortableCode({ children, ...rest }: PortableCodeProps) {
	const code =
		typeof children === 'string' ? children : (children as any)?.props.children
	const props = typeof children === 'string' ? rest : (children as any)?.props

	const match = /language-(\w+)/.exec(props.className ?? '')
	const language = match ? match[1] : 'text'

	return (
		<CodeBlock>
			<CodeBlockGroup className="border-muted/10 p-sm bg-popover border-b">
				<div className="flex items-center gap-2">
					<div className="bg-foreground/10 text-primary px-sm py-xs rounded-[calc(theme(borderRadius.base)-theme(padding.sm))] text-xs font-medium">
						{language}
					</div>
				</div>
				<div>
					<CopyButton code={code} />
				</div>
			</CodeBlockGroup>
			<CodeBlockCode code={code} />
		</CodeBlock>
	)
}

export { PortableCode }

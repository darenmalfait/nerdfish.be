import {
	CodeBlock,
	CodeBlockCode,
	CodeBlockGroup,
} from '@nerdfish/react/code-block'
import { CopyButton } from '@repo/design-system/components/copy-button'
import { type ComponentProps } from 'react'

type PortableCodeProps = ComponentProps<'pre'>

function PortableCode({ children, ...rest }: PortableCodeProps) {
	const code =
		typeof children === 'string' ? children : (children as any)?.props.children
	const props = typeof children === 'string' ? rest : (children as any)?.props

	const match = /language-(\w+)/.exec(props.className ?? '')
	const language = match ? match[1] : 'text'

	return (
		<CodeBlock className="mt-casual mb-acquaintances">
			<CodeBlockGroup className="border-border p-best-friends bg-popover border-b">
				<div className="gap-bff flex items-center">
					<div className="bg-foreground/10 text-primary px-sm py-xs rounded-[calc(var(--radius-base)-theme(padding.best-friends))] text-xs font-medium">
						{language}
					</div>
				</div>
				<div>
					<CopyButton
						code={code}
						className="rounded-[calc(var(--radius-base)-theme(padding.best-friends))]!"
					/>
				</div>
			</CodeBlockGroup>
			<CodeBlockCode code={code} />
		</CodeBlock>
	)
}

export { PortableCode }

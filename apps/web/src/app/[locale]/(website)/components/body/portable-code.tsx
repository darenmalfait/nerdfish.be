import { CodeBlock } from '@nerdfish/react/code-block'
import { type ComponentProps } from 'react'

type PortableCodeProps = ComponentProps<'pre'>

function PortableCode({ children, ...rest }: PortableCodeProps) {
	const code =
		typeof children === 'string' ? children : (children as any)?.props.children
	const props = typeof children === 'string' ? rest : (children as any)?.props

	const match = /language-(\w+)/.exec(props.className ?? '')
	const language = match ? match[1] : 'text'

	return (
		<CodeBlock
			className="mt-casual mb-acquaintances"
			code={code}
			language={language}
		/>
	)
}

export { PortableCode }

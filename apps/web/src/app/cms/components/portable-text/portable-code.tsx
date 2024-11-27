import { CodeBlock } from '@repo/ui/components'

function PortableCode({ lang, value }: { lang?: string; value?: string }) {
	if (!value) return null

	return (
		<div className="not-prose">
			<CodeBlock lang={lang ?? 'typescript'}>
				<code>{value}</code>
			</CodeBlock>
		</div>
	)
}

export { PortableCode }

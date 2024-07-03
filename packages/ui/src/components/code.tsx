'use client'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import { CopyButton } from './copy-button'

interface CodeProps {
	code: string
	lang?: string
}

async function Code({ code, lang = 'typescript' }: CodeProps) {
	return (
		<div className="shadow-outline rounded-xl bg-black/5 dark:bg-white/5">
			<div className="flex px-4 py-3">
				<div className="bg-danger mr-2 size-3 rounded-full" />
				<div className="bg-warning mr-2 size-3 rounded-full" />
				<div className="bg-success size-3 rounded-full" />
			</div>
			<div className="relative -mt-8">
				<CopyButton value={code} className="absolute right-2 top-4" />
				<SyntaxHighlighter language={lang} style={a11yDark}>
					{code}
				</SyntaxHighlighter>
			</div>
		</div>
	)
}

export { Code }

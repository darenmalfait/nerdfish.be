import DOMPurify from 'dompurify'
import { type Thing, type WithContext } from 'schema-dts'

export const JsonLd = ({ code }: { code: WithContext<Thing> }) => {
	const cleanCode = DOMPurify.sanitize(JSON.stringify(code))

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: cleanCode }}
		/>
	)
}

export type * from 'schema-dts'

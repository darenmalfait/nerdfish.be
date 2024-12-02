import { type Thing, type WithContext } from 'schema-dts'

export const JsonLd = ({ code }: { code: WithContext<Thing> }) => (
	<script
		type="application/ld+json"
		dangerouslySetInnerHTML={{ __html: JSON.stringify(code) }}
	/>
)

export type * from 'schema-dts'

import { z } from 'zod'

type Primitives = boolean | number | string | null
type JsonValue = JsonValue[] | Primitives | { [key: string]: JsonValue }

export function zodParams<TType>(schema: z.ZodType<TType>) {
	const jsonStr = z.string().transform((str, ctx) => {
		try {
			return JSON.parse(str) as JsonValue
		} catch {
			ctx.addIssue({ code: 'custom', message: 'Needs to be JSON' })
		}
	})

	const querySchema = z.object({
		input: jsonStr.pipe(schema),
	})
	return {
		decodeRequest: (req: Request) => {
			const url = new URL(req.url)
			const obj = Object.fromEntries(url.searchParams.entries())

			return querySchema.safeParse(obj)
		},
		toSearchString: (obj: (typeof schema)['_input']) => {
			schema.parse(obj)
			return `input=${encodeURIComponent(JSON.stringify(obj))}`
		},
	}
}

const emptyStringToUndefined = z.literal('').transform(() => undefined)

export function optionalField<T extends z.ZodTypeAny>(schema: T) {
	return schema.optional().or(emptyStringToUndefined)
}

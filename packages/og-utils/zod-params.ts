import { z } from 'zod'

type Primitives = boolean | number | string | null
type JsonValue = JsonValue[] | Primitives | { [key: string]: JsonValue }

const jsonStr = z.string().transform((str, ctx) => {
	try {
		return JSON.parse(str) as JsonValue
	} catch {
		ctx.addIssue({ code: 'custom', message: 'Needs to be JSON' })
	}
})

export function zodParams<TType>(schema: z.ZodType<TType>) {
	const querySchema = z.object({
		input: jsonStr.pipe(schema),
	})
	return {
		decodeRequest: (req: Request) => {
			const url = new URL(req.url)
			const obj = Object.fromEntries(url.searchParams.entries())

			return querySchema.safeParse(obj)
		},
		toSearchString: (obj: z.infer<typeof schema>) => {
			schema.parse(obj)
			return `input=${encodeURIComponent(JSON.stringify(obj))}`
		},
	}
}

function truncateWordsFn(str: string, maxCharacters: number) {
	if (str.length <= maxCharacters) {
		return str
	}
	// break at closest word
	const truncated = str.slice(0, maxCharacters)
	const lastSpace = truncated.lastIndexOf(' ')
	return `${truncated.slice(0, lastSpace)} …`
}

function truncatedWordSchema(opts: { maxCharacters: number }) {
	return z.string().transform((str) => truncateWordsFn(str, opts.maxCharacters))
}

export const fontParams = zodParams(
	z.object({
		family: z.string(),
		weight: z.number().default(400).optional(),
		text: z.string().optional(),
	}),
)

export const pageParams = zodParams(
	z.object({
		heading: truncatedWordSchema({ maxCharacters: 70 }),
	}),
)

export const blogParams = zodParams(
	z.object({
		image: z.string().optional(),
		title: truncatedWordSchema({ maxCharacters: 150 }),
	}),
)

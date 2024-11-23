import { env } from '@nerdfish-website/env'
import { z } from 'zod'

export const ogImageSchema = z.object({
	heading: z.string(),
})

export function generateOGImageUrl({
	...props
}: z.infer<typeof ogImageSchema>) {
	const url = env.NEXT_PUBLIC_URL
	const ogUrl = new URL(`${url}/api/og`)

	for (const [key, value] of Object.entries(props)) {
		ogUrl.searchParams.set(key, value)
	}

	return ogUrl.toString()
}

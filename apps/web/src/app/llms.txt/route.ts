import { buildLlmsTxt } from '~/lib/llms-txt'

export async function GET() {
	const body = await buildLlmsTxt()

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600, s-maxage=86400',
		},
	})
}

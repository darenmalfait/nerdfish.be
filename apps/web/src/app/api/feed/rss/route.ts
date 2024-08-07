import { buildFeed } from './utils'

export async function GET() {
	try {
		const feed = await buildFeed()

		return new Response(feed.rss2(), {
			status: 200,
			headers: {
				'content-type': 'application/xml; charset=utf-8',
			},
		})
	} catch {
		return new Response(`Failed to fetch feed`, {
			status: 500,
		})
	}
}

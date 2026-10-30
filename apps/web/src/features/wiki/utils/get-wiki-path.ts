import { type Wiki } from 'content-collections'

import { type PartialDeep } from '@repo/lib/types'

export function getWikiPath(post: PartialDeep<Wiki>) {
	return `/en/wiki/${post.slug}`
}

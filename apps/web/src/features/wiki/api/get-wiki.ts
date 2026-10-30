import { allWikis } from 'content-collections'

export async function getWiki({ slug }: { slug: string }) {
	return allWikis.find((item) => item.slug === slug)
}

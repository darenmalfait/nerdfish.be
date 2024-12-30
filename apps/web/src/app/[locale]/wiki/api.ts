import { allWikis } from 'content-collections'

export const wiki = {
	getWikis: async () => {
		return allWikis.sort((a, b) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime()
		})
	},
	getLatestWiki: async () => {
		return allWikis[0]
	},
	getWiki: async (slug: string) => {
		return allWikis.find((item) => item.slug === slug)
	},
}

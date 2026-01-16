import { allWikis } from 'content-collections'

export const wiki = {
	getAll: async () => {
		return allWikis.sort((a, b) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime()
		})
	},
	getLatest: async () => {
		return allWikis[0]
	},
	get: async (slug: string) => {
		return allWikis.find((item) => item.slug === slug)
	},
}

export type Article = {
	id: string
	title: string
	image?: {
		src?: string
		alt?: string
	}
	href: string
	excerpt?: string
	tags?: string[]
	category?: string
	date?: string
}

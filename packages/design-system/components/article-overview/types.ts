export interface Article {
	id: string
	title: string
	image?: {
		src?: string
		alt?: string
	}
	base64Placeholder?: string
	href: string
	excerpt?: string
	tags?: string[]
	category?: string
	date?: string
}

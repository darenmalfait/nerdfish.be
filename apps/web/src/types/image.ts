export interface ImageCredit {
	name: string
	url?: string
	source?: 'unsplash' | 'pexels' | 'pixabay'
}

export interface ImageType {
	src: string
	alt: string
	credit?: ImageCredit
}

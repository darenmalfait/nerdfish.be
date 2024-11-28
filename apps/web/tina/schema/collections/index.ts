import * as blogPosts from './blog-posts'
import * as global from './global'
import * as pages from './pages'
import * as products from './products'
import * as wiki from './wiki'
import * as work from './work'

export const collections = {
	...blogPosts,
	...global,
	...pages,
	...products,
	...wiki,
	...work,
}

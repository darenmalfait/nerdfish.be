import { allPosts, type Post } from 'content-collections'
import { LocalizedContentService } from '~/features/shared/content/content-service'

export class BlogContentService extends LocalizedContentService<Post> {
	constructor() {
		super(allPosts)
	}
}

export const blog = new BlogContentService()

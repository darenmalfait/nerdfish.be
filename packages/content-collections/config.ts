import { defineConfig } from '@content-collections/core'
import { posts } from './collections/blog'
import { wiki } from './collections/wiki'

export default defineConfig({
	collections: [posts, wiki],
})

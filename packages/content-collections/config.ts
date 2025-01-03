import { defineConfig } from '@content-collections/core'
import { posts } from './collections/blog'
import { projects } from './collections/projects'
import { testimonials } from './collections/testimonial'
import { wiki } from './collections/wiki'

export default defineConfig({
	collections: [posts, wiki, testimonials, projects],
})

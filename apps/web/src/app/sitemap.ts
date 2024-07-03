import { type MetadataRoute } from 'next'

import { getSitemapData } from './api'
import { getDatedSlug } from './common'

const BASE_URL = process.env.NEXT_PUBLIC_URL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const data = await getSitemapData()

	return [
		{
			url: `${BASE_URL}/`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
		},
		...(data.pages?.map((page) => {
			return {
				url: `${BASE_URL}/${
					page._sys?.filename !== 'home' ? page._sys?.filename : ''
				}`,
				lastModified: new Date(),
				priority: 1,
			}
		}) ?? []),
		...(data.works?.map((work) => {
			return {
				url: `${BASE_URL}/work/${work.category ?? ''}/${work._sys?.filename}`,
				lastModified: new Date(),
				priority: 0.9,
			}
		}) ?? []),
		...(data.blogs?.map((blog) => {
			return {
				url: `${BASE_URL}/blog/${getDatedSlug(blog.date, blog._sys?.filename)}`,
				lastModified: new Date(),
				priority: 0.8,
			}
		}) ?? []),
		...(data.wikis?.map((wiki) => {
			return {
				url: `${BASE_URL}/wiki/${getDatedSlug(wiki.date, wiki._sys?.filename)}`,
				lastModified: new Date(wiki.date ?? ''),
				priority: 0.5,
			}
		}) ?? []),
	]
}

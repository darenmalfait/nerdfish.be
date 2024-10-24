import { Feed } from 'feed'
import { getBlogPosts } from '~/app/[locale]/blog'
import { getBlogPath } from '~/app/[locale]/blog/utils'

export async function buildFeed() {
	const feed = new Feed({
		title: 'Daren Malfait - Full Stack Web developer',
		description: "Daren's blog about full stack web development",
		id: 'https://nerdfish.be',
		link: 'https://nerdfish.be',
		copyright: 'Daren Malfait',
		language: 'en',
		author: {
			name: 'Daren Malfait',
			email: 'daren@nerdfish.be',
		},
	})

	const posts = (await getBlogPosts()) ?? []

	posts.reverse().forEach((post) => {
		const link = `${process.env.NEXT_PUBLIC_URL}${getBlogPath(post)}`

		feed.addItem({
			title: post.title ?? '',
			id: link,
			link,
			description: post.excerpt ?? '',
			author: [
				{
					name: 'Daren Malfait',
					email: 'daren@nerdfish.be',
					link: 'https://www.nerdfish.be',
				},
			],
			date: new Date(post.date ?? ''),
			image: `${process.env.NEXT_PUBLIC_URL}${post.heroImg ?? ''}`,
		})
	})

	return feed
}

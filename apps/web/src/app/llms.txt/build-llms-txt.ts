import { env } from 'env'
import { blog } from '~/app/[locale]/(website)/blog/api'
import { getBlogPath } from '~/app/[locale]/(website)/blog/utils'
import { work } from '~/app/[locale]/(website)/work/api'
import { getWorkPath } from '~/app/[locale]/(website)/work/utils'

type LlmsEntry = {
	title: string
	summary: string
	href: string
}

const staticPages: LlmsEntry[] = [
	{
		title: 'Home',
		summary:
			'Freelance web developer and designer in Harelbeke — websites, UX/UI, and web apps.',
		href: '/',
	},
	{
		title: 'About',
		summary:
			'Freelance web developer profile, toolbox, FAQ, and collaboration details.',
		href: '/about',
	},
	{
		title: 'Blog',
		summary: 'Web design and development articles, tips, and project stories.',
		href: '/blog',
	},
	{
		title: 'Work',
		summary: 'Portfolio of web design, branding, and open-source projects.',
		href: '/work',
	},
	{
		title: 'Contact',
		summary: 'Contact form and details for project enquiries.',
		href: '/contact',
	},
	{
		title: 'Wiki',
		summary: 'Knowledge base articles on web development topics.',
		href: '/wiki',
	},
	{
		title: 'Privacy policy',
		summary: 'How personal data is collected and processed on this site.',
		href: '/privacy',
	},
	{
		title: 'Websites',
		summary: 'Freelance website design and development services.',
		href: '/expertise/webdesign',
	},
	{
		title: 'UX/UI design',
		summary: 'User-centred interface design for web and apps.',
		href: '/expertise/uxui-design',
	},
	{
		title: 'Branding',
		summary: 'Brand identity and visual design services.',
		href: '/expertise/branding',
	},
	{
		title: '3D printing',
		summary: 'Custom 3D printing services in Harelbeke.',
		href: '/expertise/3d-printing',
	},
]

function formatEntry(baseUrl: string, { title, summary, href }: LlmsEntry) {
	const url = `${baseUrl}${href}`
	return `- [${title}](${url}): ${summary}`
}

export async function buildLlmsTxt(): Promise<string> {
	const baseUrl = env.NEXT_PUBLIC_URL
	const [posts, works] = await Promise.all([blog.getAll(), work.getAll()])

	const lines = [
		'# nerdfish.be',
		'',
		`> ${baseUrl} — freelance web development and design by Daren Malfait (Harelbeke, Belgium).`,
		'',
		'## Pages',
		'',
		...staticPages.map((entry) => formatEntry(baseUrl, entry)),
		'',
		'## Blog',
		'',
		...posts.map((post) =>
			formatEntry(baseUrl, {
				title: post.title,
				summary: post.excerpt,
				href: getBlogPath(post),
			}),
		),
		'',
		'## Work',
		'',
		...works.map((item) =>
			formatEntry(baseUrl, {
				title: item.title,
				summary: item.excerpt,
				href: getWorkPath(item),
			}),
		),
		'',
		'## Machine-readable',
		'',
		`- [Sitemap](${baseUrl}/sitemap.xml)`,
		`- [Robots](${baseUrl}/robots.txt)`,
		'',
	]

	return lines.join('\n')
}

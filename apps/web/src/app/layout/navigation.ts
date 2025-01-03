import { type Locale } from '@repo/i18n/types'

export interface SubNavItem {
	label: string
	description: string
	href: string
}

export interface NavItem {
	label: string
	href: string
	sub?: SubNavItem[]
}

export interface Navigation {
	main: NavItem[]
}

type LocalizedNavigation = Record<Locale, Navigation>

export const navigation: LocalizedNavigation = {
	en: {
		main: [
			{
				label: 'Expertise',
				href: '',
				sub: [
					{
						label: 'Websites',
						description:
							'Transform your ideas into visually stunning, user-friendly websites.',
						href: '/webdesign',
					},
					{
						label: 'Freelance services',
						description:
							'Get help with your Javascript projects, from architecture to implementation.',
						href: '/freelance',
					},
					{
						label: 'Branding',
						description:
							'Crafting unique, consistent, and impactful brand identities tailored to your business',
						href: '/branding',
					},
					{
						label: '3D Printing',
						description: '3D printing services for your projects',
						href: '/3d-printing',
					},
				],
			},
			{
				label: 'About',
				href: '/about',
			},
			{
				label: 'Blog',
				href: '/blog',
			},
			{
				label: 'Work',
				href: '/work',
			},
			{
				label: 'Contact',
				href: '/contact',
			},
		],
	},
	nl: {
		main: [
			{
				label: 'Expertise',
				href: '',
				sub: [
					{
						label: 'Websites',
						description:
							'Transformeer uw ideeën in visueel verbluffende, gebruiksvriendelijke websites.',
						href: '/nl/webdesign',
					},
					{
						label: 'Freelance diensten',
						description:
							'Krijg hulp bij uw Javascript projecten, van architectuur tot implementatie.',
						href: '/nl/freelance',
					},
					{
						label: 'Branding',
						description:
							'Het creëren van unieke, consistente en impactvolle merkidentiteiten op maat van uw bedrijf',
						href: '/nl/branding',
					},
					{
						label: '3D Printing',
						description: '3D print services voor uw projecten',
						href: '/nl/3d-printing',
					},
				],
			},
			{
				label: 'Over mij',
				href: '/nl/over-mij',
			},
			{
				label: 'Blog',
				href: '/nl/blog',
			},
			{
				label: 'Werk',
				href: '/nl/werk',
			},
			{
				label: 'Contact',
				href: '/nl/contact',
			},
		],
	},
} as const

export function getNavigation(type: keyof Navigation, locale: Locale) {
	return navigation[locale][type]
}

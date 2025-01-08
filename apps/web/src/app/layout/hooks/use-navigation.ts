'use client'

import { useTranslations } from '@repo/i18n/client'

export interface SubNavItem {
	label: string
	description: string
	href: string
}

export interface NavigationItem {
	label: string
	href: string
	sub?: SubNavItem[]
}

export interface Navigation {
	main: NavigationItem[]
}

export function useNavigation(): Navigation {
	const t = useTranslations('global.navigation')

	const main: Navigation['main'] = [
		{
			label: t('main.expertise.label'),
			href: '',
			sub: [
				{
					label: t('main.expertise.webdesign.title'),
					description: t('main.expertise.webdesign.description'),
					href: '/expertise/webdesign',
				},
				{
					label: t('main.expertise.freelance.title'),
					description: t('main.expertise.freelance.description'),
					href: '/expertise/freelance',
				},
				{
					label: t('main.expertise.branding.title'),
					description: t('main.expertise.branding.description'),
					href: '/expertise/branding',
				},
				{
					label: t('main.expertise.3dprinting.title'),
					description: t('main.expertise.3dprinting.description'),
					href: '/expertise/3d-printing',
				},
			],
		},
		{
			label: t('main.about.label'),
			href: '/about',
		},
		{
			label: t('main.blog.label'),
			href: '/blog',
		},
		{
			label: t('main.work.label'),
			href: '/work',
		},
		{
			label: t('main.contact.label'),
			href: '/contact',
		},
	]

	return { main }
}

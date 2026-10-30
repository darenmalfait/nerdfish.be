'use client'

import { type ComponentPropsWithoutRef, type ReactNode, useRef } from 'react'
import { Button, buttonVariants } from '@nerdfish/react/button'
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from '@nerdfish/react/item'
import {
	NavigationMenu,
	NavigationMenuArrow,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuPopup,
	NavigationMenuPositioner,
	NavigationMenuTrigger,
} from '@nerdfish/react/navigation-menu'
import { AnimatedBackground } from '@repo/design-system/components/animated-background'
import { socials } from '@repo/global-settings/socials'
import { useTranslations } from '@repo/i18n/client'
import { cva, cn } from '@repo/lib/utils/class'
import { stripPreSlash } from '@repo/lib/utils/string'
import { usePathname } from 'routing'

import { Link } from '~/components/link'
import { getActiveMainNavLabel } from '~/features/site/utils/navigation-active'

import {
	useNavigation,
	type Navigation,
	type SubNavItem,
} from '../hooks/use-navigation'

function MainNavigationSubItem({
	href,
	label,
	description,
	className,
	...props
}: ComponentPropsWithoutRef<typeof Link> & SubNavItem) {
	return (
		<NavigationMenuItem className="w-full">
			<NavigationMenuLink
				render={
					<Link
						className={cn('p-0!', className)}
						href={`/${stripPreSlash(href)}`}
						{...props}
					>
						<Item className="p-best-friends!">
							<ItemContent>
								<ItemTitle>{label}</ItemTitle>
								<ItemDescription>{description}</ItemDescription>
							</ItemContent>
						</Item>
					</Link>
				}
			/>
		</NavigationMenuItem>
	)
}

const getMainItemClassName = cva(
	cn(
		buttonVariants({ variant: 'secondary', size: 'sm', className: 'h-full' }),
		'hover:text-foreground focus-visible:ring-ring relative flex h-full cursor-pointer items-center bg-transparent text-xs font-bold whitespace-nowrap capitalize transition outline-none focus:bg-transparent focus-visible:ring-2 active:bg-transparent lg:text-sm',
	),
	{
		variants: {
			variant: {
				active: '!bg-transparent !text-foreground-inverted',
				default: 'text-foreground',
			},
		},
	},
)

function MainNavigationItem({
	isActive,
	href,
	label,
	sub,
	...props
}: Omit<ComponentPropsWithoutRef<'a'>, 'href'> &
	Navigation['main'][number] & { isActive: boolean }) {
	if (!sub?.length && !href) return null

	if (!sub?.length) {
		return (
			<NavigationMenuItem
				className="h-full"
				render={
					<NavigationMenuLink
						className={cn(
							getMainItemClassName({
								variant: isActive ? 'active' : 'default',
							}),
							{ 'hover:bg-background-muted': !isActive },
						)}
						render={
							<Link
								{...props}
								href={`/${stripPreSlash(href)}`}
								aria-current={isActive ? 'page' : undefined}
							>
								{label}
							</Link>
						}
					/>
				}
			/>
		)
	}

	return (
		<NavigationMenuItem
			className="h-full"
			render={
				<span>
					<NavigationMenuTrigger
						aria-current={isActive ? 'page' : undefined}
						className={cn(
							getMainItemClassName({
								variant: isActive ? 'active' : 'default',
							}),
							{ 'hover:bg-background-muted': !isActive },
						)}
					>
						{label}
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className={cn('gap-best-friends p-bff flex flex-col lg:w-100')}>
							{sub.map((subNavItem) => {
								return (
									<MainNavigationSubItem
										key={subNavItem.label}
										{...subNavItem}
									/>
								)
							})}
						</ul>
					</NavigationMenuContent>
				</span>
			}
		/>
	)
}

function SocialLink({
	href,
	label,
	children,
}: {
	href?: string
	label: string
	children: ReactNode
}) {
	if (!href) return null

	return (
		<li>
			<Button
				variant="secondary"
				className="text-xs"
				render={
					<Link aria-label={label} href={href} target="_blank">
						{children}
					</Link>
				}
			/>
		</li>
	)
}

export function SocialLinks() {
	const t = useTranslations('global.socials')

	return (
		<nav aria-label={t('label')}>
			<ul className="gap-best-friends flex flex-row items-center">
				<SocialLink href={socials.twitter} label={t('twitter')}>
					Twitter
				</SocialLink>
				<SocialLink href={socials.bluesky} label={t('bluesky')}>
					Bluesky
				</SocialLink>
				<SocialLink href={socials.facebook} label={t('facebook')}>
					Facebook
				</SocialLink>
				<SocialLink href={socials.instagram} label={t('instagram')}>
					Instagram
				</SocialLink>
				<SocialLink href={socials.linkedIn} label={t('linkedIn')}>
					LinkedIn
				</SocialLink>
				<SocialLink href={socials.github} label={t('github')}>
					Github
				</SocialLink>
			</ul>
		</nav>
	)
}

export function SiteNavigation() {
	const { main: navigation } = useNavigation()
	const pathname = usePathname()
	const t = useTranslations('global')
	const ref = useRef<HTMLUListElement>(null)

	const activeId = getActiveMainNavLabel(navigation, pathname)

	return (
		<div className="relative hidden lg:flex">
			<NavigationMenu ref={ref} aria-label="main">
				<NavigationMenuList
					className="space-x-bff relative flex h-full flex-1"
					aria-label={t('navigation.pages')}
				>
					<AnimatedBackground
						value={activeId}
						className="rounded-base bg-foreground h-full"
						transition={{
							type: 'spring',
							bounce: 0.2,
							duration: 0.3,
						}}
					>
						{navigation.map((mainNavItem) => {
							return (
								<li
									key={mainNavItem.label}
									data-id={mainNavItem.label}
									className="h-full"
								>
									<MainNavigationItem
										isActive={activeId === mainNavItem.label}
										{...mainNavItem}
									/>
								</li>
							)
						})}
					</AnimatedBackground>
				</NavigationMenuList>
				<NavigationMenuPositioner>
					<NavigationMenuPopup>
						<NavigationMenuArrow />
					</NavigationMenuPopup>
				</NavigationMenuPositioner>
			</NavigationMenu>
		</div>
	)
}

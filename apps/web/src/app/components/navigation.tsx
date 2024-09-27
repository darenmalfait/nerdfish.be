'use client'

import {
	Button,
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@nerdfish/ui'
import { cva, cx } from '@nerdfish/utils'
import { stripPreSlash } from '@nerdfish-website/lib/utils'
import { Icons } from '@nerdfish-website/ui/icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'

import { type GlobalNavigationMain, type GlobalNavigationMainSub } from '../cms'
import { useGlobal } from '../global-provider'

export function RSSFeedButton({ className }: { className?: string }) {
	return (
		<Button variant="ghost" size="icon" className={className} asChild>
			<a target="_blank" href="/rss.xml" aria-label="rss feed" rel="noreferrer">
				<span className="sr-only">RSS feed</span>
				<Icons.Rss className="size-4" />
			</a>
		</Button>
	)
}

export function ActionsNavigation({
	className,
	onSelect,
}: {
	className?: string
	onSelect?: () => void
}) {
	const { navigation } = useGlobal()

	return (
		<div className={cx('space-x-3', className)}>
			{navigation?.actions?.map((link) => {
				if (!link) return null

				return (
					<Button key={link.label} onClick={onSelect} asChild>
						<Link href={`/${stripPreSlash(link.href)}`}>{link.label}</Link>
					</Button>
				)
			})}
		</div>
	)
}

const MainNavigationSubItem = React.forwardRef<
	React.ElementRef<typeof Link>,
	React.ComponentPropsWithoutRef<typeof Link> & GlobalNavigationMainSub
>(({ href, label, description, className, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuItem>
				<NavigationMenuLink asChild>
					<Link
						className={cx(
							'hover:bg-inverted/5 dark:hover:bg-inverted/15 focus:bg-inverted/5 dark:focus:bg-inverted/15 rounded-semi block select-none space-y-1 p-3 leading-none no-underline outline-none transition-colors',
							className,
						)}
						ref={ref}
						href={`/${stripPreSlash(href)}`}
						{...props}
					>
						<div className="text-sm font-medium leading-none">{label}</div>
						{description ? (
							<p className="text-muted line-clamp-2 text-sm leading-snug">
								{description}
							</p>
						) : null}
					</Link>
				</NavigationMenuLink>
			</NavigationMenuItem>
		</li>
	)
})
MainNavigationSubItem.displayName = 'MainNavigationSubItem'

const getMainItemClassName = cva(
	'relative flex h-8 cursor-pointer bg-transparent font-semibold hover:text-primary items-center gap-x-1.5 whitespace-nowrap rounded-semi px-3 capitalize outline-none !ring-muted transition focus-outline active:bg-primary sm:h-10 sm:px-4',
	{
		variants: {
			variant: {
				active: 'text-primary',
				default: 'px-3 text-muted',
			},
		},
	},
)

function MainNavigationItem({ href, label, sub }: GlobalNavigationMain) {
	const pathname = usePathname()
	if (!sub?.length && !href) return null

	if (!sub?.length) {
		const isActive = stripPreSlash(pathname).startsWith(href ?? '')

		return (
			<NavigationMenuItem>
				<NavigationMenuLink asChild>
					<Link
						href={`/${stripPreSlash(href ?? '')}`}
						className={cx(
							getMainItemClassName({
								variant: isActive ? 'active' : 'default',
							}),
						)}
					>
						{label}
					</Link>
				</NavigationMenuLink>
			</NavigationMenuItem>
		)
	}

	const isActive = sub.some((subNavItem) => {
		if (!subNavItem) return false

		return stripPreSlash(pathname).startsWith(subNavItem.href)
	})

	return (
		<NavigationMenuItem>
			<NavigationMenuTrigger
				className={getMainItemClassName({
					variant: isActive ? 'active' : 'default',
				})}
			>
				{label}
			</NavigationMenuTrigger>
			<NavigationMenuContent>
				<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
					{sub.map((subNavItem, i) => {
						if (!subNavItem) return null

						return <MainNavigationSubItem key={i} {...subNavItem} />
					})}
				</ul>
			</NavigationMenuContent>
		</NavigationMenuItem>
	)
}

export function SocialLinks() {
	const { social } = useGlobal()

	return (
		<div className="flex flex-row items-center gap-3">
			{social?.twitter ? (
				<Button variant="ghost" size="icon" asChild>
					<Link aria-label="Twitter feed" href={social.twitter}>
						<Icons.Twitter className="size-4 duration-75 ease-linear" />
					</Link>
				</Button>
			) : null}
			{social?.facebook ? (
				<Button variant="ghost" size="icon" asChild>
					<Link aria-label="Facebook page" href={social.facebook}>
						<Icons.Facebook className="size-4 duration-75 ease-linear" />
					</Link>
				</Button>
			) : null}
			{social?.instagram ? (
				<Button variant="ghost" size="icon" asChild>
					<Link
						aria-label="Instagram
          "
						href={social.instagram}
					>
						<Icons.Instagram className="size-4 duration-75 ease-linear" />
					</Link>
				</Button>
			) : null}
			{social?.linkedIn ? (
				<Button variant="ghost" size="icon" asChild>
					<Link aria-label="LinkedIn profile" href={social.linkedIn}>
						<Icons.LinkedIn className="size-4 duration-75 ease-linear" />
					</Link>
				</Button>
			) : null}
			{social?.github ? (
				<Button variant="ghost" size="icon" asChild>
					<Link aria-label="Github Repository" href={social.github}>
						<Icons.GitHub className="size-4 duration-75 ease-linear" />
						<span className="sr-only">Github</span>
					</Link>
				</Button>
			) : null}
		</div>
	)
}

export function MainNavigation() {
	const { navigation } = useGlobal()

	return (
		<NavigationMenu>
			<NavigationMenuList className="gap-2">
				{navigation?.main?.map((mainNavItem) => {
					if (!mainNavItem) return null

					return <MainNavigationItem key={mainNavItem.label} {...mainNavItem} />
				})}
			</NavigationMenuList>
		</NavigationMenu>
	)
}

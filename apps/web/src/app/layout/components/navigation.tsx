'use client'

import { AnimatedBackground } from '@repo/design-system/components/animated-background'
import {
	Button,
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@repo/design-system/components/ui'
import { socials } from '@repo/global-settings/socials'
import { useTranslations } from '@repo/i18n/client'
import { cva, cx } from '@repo/lib/utils/base'
import { stripPreSlash } from '@repo/lib/utils/string'
import * as React from 'react'
import { usePathname } from 'routing'
import {
	useNavigation,
	type Navigation,
	type SubNavItem,
} from '../hooks/use-navigation'
import { Link } from '~/app/components/link'

const MainNavigationSubItem = React.forwardRef<
	React.ComponentRef<typeof Link>,
	React.ComponentPropsWithoutRef<typeof Link> & SubNavItem
>(({ href, label, description, className, ...props }, ref) => {
	return (
		<NavigationMenuItem className="w-full">
			<NavigationMenuLink asChild>
				<Link
					className={cx(
						'space-y-sm p-md focus-within:outline-active hover:bg-background-muted group relative flex h-full w-full select-none flex-col justify-end rounded-[calc(theme(borderRadius.base)-theme(padding.xs))] leading-none no-underline outline-none transition-colors',
						className,
					)}
					ref={ref}
					href={`/${stripPreSlash(href)}`}
					{...props}
				>
					<div className="text-sm font-black leading-none">{label}</div>
					{description ? (
						<p className="text-foreground-muted mb-0 line-clamp-1 text-sm leading-snug">
							{description}
						</p>
					) : null}
				</Link>
			</NavigationMenuLink>
		</NavigationMenuItem>
	)
})
MainNavigationSubItem.displayName = 'MainNavigationSubItem'

const getMainItemClassName = cva(
	'focus-outline !rounded-full relative h-auto flex cursor-pointer items-center whitespace-nowrap bg-transparent font-bold text-xs capitalize outline-none transition hover:text-foreground focus:bg-transparent active:bg-transparent lg:text-sm',
	{
		variants: {
			variant: {
				active: '!bg-transparent !text-background',
				default: 'text-foreground',
			},
		},
	},
)

const MainNavigationItem = React.forwardRef<
	React.ComponentRef<'a'>,
	Omit<React.ComponentPropsWithoutRef<'a'>, 'href'> & Navigation['main'][number]
>(({ href, label, sub, ...props }, ref) => {
	const pathname = usePathname()
	if (!sub?.length && !href) return null

	if (!sub?.length) {
		const isActive = stripPreSlash(pathname).startsWith(stripPreSlash(href))

		return (
			<NavigationMenuItem asChild>
				<NavigationMenuLink asChild>
					<Button
						variant="secondary"
						className={cx(
							getMainItemClassName({
								variant: isActive ? 'active' : 'default',
							}),
							{ 'hover:bg-background-inverted/10': !isActive },
						)}
						asChild
					>
						<Link {...props} ref={ref} href={`/${stripPreSlash(href)}`}>
							{label}
						</Link>
					</Button>
				</NavigationMenuLink>
			</NavigationMenuItem>
		)
	}

	const isActive = sub.some((subNavItem) => {
		return stripPreSlash(pathname).startsWith(stripPreSlash(subNavItem.href))
	})

	return (
		<NavigationMenuItem asChild>
			<span>
				<Button
					variant="secondary"
					className={getMainItemClassName({
						variant: isActive ? 'active' : 'default',
					})}
					asChild
				>
					<NavigationMenuTrigger>{label}</NavigationMenuTrigger>
				</Button>
				<NavigationMenuContent className="rounded-base bg-background">
					<ul
						className={cx(
							'gap-sm p-xs flex flex-col lg:w-[400px] lg:w-[500px]',
						)}
					>
						{sub.map((subNavItem) => {
							return (
								<MainNavigationSubItem key={subNavItem.label} {...subNavItem} />
							)
						})}
					</ul>
				</NavigationMenuContent>
			</span>
		</NavigationMenuItem>
	)
})

MainNavigationItem.displayName = 'MainNavigationItem'

const socialLinkClassName = 'text-xs'

export function SocialLinks() {
	return (
		<nav aria-label="Social Media">
			<ul className="gap-sm flex flex-row items-center">
				{socials.twitter ? (
					<li>
						<Button variant="secondary" className={socialLinkClassName} asChild>
							<Link
								aria-label="Twitter feed"
								href={socials.twitter}
								target="_blank"
							>
								Twitter
							</Link>
						</Button>
					</li>
				) : null}
				{socials.bluesky ? (
					<li>
						<Button variant="secondary" className={socialLinkClassName} asChild>
							<Link
								aria-label="Bluesky feed"
								href={socials.bluesky}
								target="_blank"
							>
								Bluesky
							</Link>
						</Button>
					</li>
				) : null}
				{socials.facebook ? (
					<li>
						<Button variant="secondary" className={socialLinkClassName} asChild>
							<Link
								aria-label="Facebook page"
								href={socials.facebook}
								target="_blank"
							>
								Facebook
							</Link>
						</Button>
					</li>
				) : null}
				{socials.instagram ? (
					<li>
						<Button variant="secondary" className={socialLinkClassName} asChild>
							<Link
								aria-label="Instagram"
								href={socials.instagram}
								target="_blank"
							>
								Instagram
							</Link>
						</Button>
					</li>
				) : null}
				{socials.linkedIn ? (
					<li>
						<Button variant="secondary" className={socialLinkClassName} asChild>
							<Link
								aria-label="LinkedIn profile"
								href={socials.linkedIn}
								target="_blank"
							>
								LinkedIn
							</Link>
						</Button>
					</li>
				) : null}
				{socials.github ? (
					<li>
						<Button variant="secondary" className={socialLinkClassName} asChild>
							<Link
								aria-label="Github Repository"
								href={socials.github}
								target="_blank"
							>
								Github
							</Link>
						</Button>
					</li>
				) : null}
			</ul>
		</nav>
	)
}

export function MainNavigation() {
	const { main: navigation } = useNavigation()
	const pathname = usePathname()
	const t = useTranslations('global')
	const ref = React.useRef<HTMLUListElement>(null)

	const activeId = React.useMemo(() => {
		const isActive = navigation.find((item) => {
			return (
				item.sub?.some(
					(subItem) =>
						subItem.href &&
						stripPreSlash(pathname).startsWith(stripPreSlash(subItem.href)),
				) ??
				(item.href &&
					stripPreSlash(pathname).startsWith(stripPreSlash(item.href)))
			)
		})

		return isActive?.label ?? 'home'
	}, [navigation, pathname])

	return (
		<div
			className={cx(
				'hidden lg:flex',
				'rounded-container bg-background-muted p-xs inset-x-0 mx-auto w-fit max-w-full',
			)}
		>
			<NavigationMenu
				ref={ref}
				aria-label="main"
				viewportClassName="-translate-y-[calc(100%+50px)] lg:translate-y-0"
			>
				<NavigationMenuList
					className="space-x-xs relative flex flex-1"
					aria-label={t('navigation.pages')}
				>
					<AnimatedBackground
						value={activeId}
						className="rounded-container bg-foreground"
						transition={{
							type: 'spring',
							bounce: 0.2,
							duration: 0.3,
						}}
					>
						{navigation.map((mainNavItem) => {
							return (
								<li key={mainNavItem.label} data-id={mainNavItem.label}>
									<MainNavigationItem {...mainNavItem} />
								</li>
							)
						})}
					</AnimatedBackground>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	)
}

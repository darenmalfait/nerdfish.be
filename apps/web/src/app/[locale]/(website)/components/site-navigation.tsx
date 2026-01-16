'use client'

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
import {
	type ComponentPropsWithoutRef,
	type ComponentRef,
	forwardRef,
	useMemo,
	useRef,
} from 'react'
import { usePathname } from 'routing'
import {
	useNavigation,
	type Navigation,
	type SubNavItem,
} from '../hooks/use-navigation'
import { Link } from './link'

const MainNavigationSubItem = forwardRef<
	ComponentRef<typeof Link>,
	ComponentPropsWithoutRef<typeof Link> & SubNavItem
>(({ href, label, description, className, ...props }, ref) => {
	return (
		<NavigationMenuItem className="w-full">
			<NavigationMenuLink
				render={
					<Link
						className="p-0!"
						ref={ref}
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
})
MainNavigationSubItem.displayName = 'MainNavigationSubItem'

const getMainItemClassName = cva(
	cn(
		buttonVariants({ variant: 'secondary', size: 'sm', className: 'h-full' }),
		'focus-outline hover:text-foreground relative flex h-full cursor-pointer items-center bg-transparent text-xs font-bold whitespace-nowrap capitalize transition outline-none focus:bg-transparent active:bg-transparent lg:text-sm',
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

const MainNavigationItem = forwardRef<
	ComponentRef<'a'>,
	Omit<ComponentPropsWithoutRef<'a'>, 'href'> & Navigation['main'][number]
>(({ href, label, sub, ...props }, ref) => {
	const pathname = usePathname()
	if (!sub?.length && !href) return null

	if (!sub?.length) {
		const isActive = stripPreSlash(pathname).startsWith(stripPreSlash(href))

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
							<Link {...props} ref={ref} href={`/${stripPreSlash(href)}`}>
								{label}
							</Link>
						}
					/>
				}
			/>
		)
	}

	const isActive = sub.some((subNavItem) => {
		return stripPreSlash(pathname).startsWith(stripPreSlash(subNavItem.href))
	})

	return (
		<NavigationMenuItem
			className="h-full"
			render={
				<span>
					<NavigationMenuTrigger
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
})

MainNavigationItem.displayName = 'MainNavigationItem'

const socialLinkClassName = 'text-xs'

export function SocialLinks() {
	return (
		<nav aria-label="Social Media">
			<ul className="gap-best-friends flex flex-row items-center">
				{socials.twitter ? (
					<li>
						<Button
							variant="secondary"
							className={socialLinkClassName}
							render={
								<Link
									aria-label="Twitter feed"
									href={socials.twitter}
									target="_blank"
								>
									Twitter
								</Link>
							}
						/>
					</li>
				) : null}
				{socials.bluesky ? (
					<li>
						<Button
							variant="secondary"
							className={socialLinkClassName}
							render={
								<Link
									aria-label="Bluesky feed"
									href={socials.bluesky}
									target="_blank"
								>
									Bluesky
								</Link>
							}
						/>
					</li>
				) : null}
				{socials.facebook ? (
					<li>
						<Button
							variant="secondary"
							className={socialLinkClassName}
							render={
								<Link
									aria-label="Facebook page"
									href={socials.facebook}
									target="_blank"
								>
									Facebook
								</Link>
							}
						/>
					</li>
				) : null}
				{socials.instagram ? (
					<li>
						<Button
							variant="secondary"
							className={socialLinkClassName}
							render={
								<Link
									aria-label="Instagram"
									href={socials.instagram}
									target="_blank"
								>
									Instagram
								</Link>
							}
						/>
					</li>
				) : null}
				{socials.linkedIn ? (
					<li>
						<Button
							variant="secondary"
							className={socialLinkClassName}
							render={
								<Link
									aria-label="LinkedIn profile"
									href={socials.linkedIn}
									target="_blank"
								>
									LinkedIn
								</Link>
							}
						/>
					</li>
				) : null}
				{socials.github ? (
					<li>
						<Button
							variant="secondary"
							className={socialLinkClassName}
							render={
								<Link
									aria-label="Github Repository"
									href={socials.github}
									target="_blank"
								>
									Github
								</Link>
							}
						/>
					</li>
				) : null}
			</ul>
		</nav>
	)
}

export function SiteNavigation() {
	const { main: navigation } = useNavigation()
	const pathname = usePathname()
	const t = useTranslations('global')
	const ref = useRef<HTMLUListElement>(null)

	const activeId = useMemo(() => {
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
									<MainNavigationItem {...mainNavItem} />
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

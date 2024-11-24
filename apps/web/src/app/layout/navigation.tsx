import {
	Button,
	type ButtonProps,
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@nerdfish/ui'
import { cva, cx } from '@nerdfish/utils'
import { stripPreSlash } from '@nerdfish-website/lib/utils'
import {
	FacebookIcon,
	GithubIcon,
	InstagramIcon,
	LinkedInIcon,
	TwitterIcon,
} from '@nerdfish-website/ui/icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import {
	type GlobalNavigationMain,
	type GlobalNavigationMainSub,
} from '~/app/cms'
import { useGlobal } from '~/app/global-provider'

const MainNavigationSubItem = React.forwardRef<
	React.ElementRef<typeof Link>,
	React.ComponentPropsWithoutRef<typeof Link> & GlobalNavigationMainSub
>(({ href, label, description, className, ...props }, ref) => {
	return (
		<NavigationMenuItem className="w-full">
			<NavigationMenuLink asChild>
				<Link
					className={cx(
						'focus-within:outline-active hover:bg-muted rounded-semi p-md space-y-sm group relative flex h-full w-full select-none flex-col justify-end leading-none no-underline outline-none transition-colors',
						className,
					)}
					ref={ref}
					href={`/${stripPreSlash(href)}`}
					{...props}
				>
					<div className="text-sm font-black leading-none">{label}</div>
					{description ? (
						<p className="text-muted mb-0 line-clamp-1 text-sm leading-snug">
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
	'relative flex h-8 cursor-pointer !rounded-large bg-transparent font-semibold hover:text-primary items-center gap-x-sm whitespace-nowrap  capitalize outline-none !ring-muted transition focus-outline active:bg-primary sm:h-10',
	{
		variants: {
			variant: {
				active: 'bg-inverted text-inverted',
				default: 'text-primary',
			},
		},
	},
)

const MainNavigationItem = React.forwardRef<
	React.ElementRef<'a'>,
	Omit<React.ComponentPropsWithoutRef<'a'>, 'href'> & GlobalNavigationMain
>(({ href, label, sub, variant, ...props }, ref) => {
	const pathname = usePathname()
	if (!sub?.length && !href) return null

	if (!sub?.length) {
		const isActive = stripPreSlash(pathname).startsWith(
			stripPreSlash(href ?? ''),
		)

		return (
			<NavigationMenuItem>
				<NavigationMenuLink asChild>
					<Button
						variant={(variant as ButtonProps['variant']) ?? 'ghost'}
						className={cx(
							getMainItemClassName({
								variant: isActive ? 'active' : 'default',
							}),
						)}
						asChild
					>
						<Link {...props} ref={ref} href={`/${stripPreSlash(href ?? '')}`}>
							{label}
						</Link>
					</Button>
				</NavigationMenuLink>
			</NavigationMenuItem>
		)
	}

	const isActive = sub.some((subNavItem) => {
		if (!subNavItem) return false

		return stripPreSlash(pathname).startsWith(stripPreSlash(subNavItem.href))
	})

	return (
		<NavigationMenuItem>
			<Button
				variant={(variant as ButtonProps['variant']) ?? 'ghost'}
				className={cx(
					getMainItemClassName({
						variant: isActive ? 'active' : 'default',
					}),
				)}
				asChild
			>
				<NavigationMenuTrigger>{label}</NavigationMenuTrigger>
			</Button>
			<NavigationMenuContent className="bg-primary rounded-semi">
				<ul
					className={cx('gap-sm p-xs flex flex-col md:w-[400px] lg:w-[500px]')}
				>
					{sub.map((subNavItem) => {
						if (!subNavItem) return null

						return (
							<MainNavigationSubItem key={subNavItem.label} {...subNavItem} />
						)
					})}
				</ul>
			</NavigationMenuContent>
		</NavigationMenuItem>
	)
})

MainNavigationItem.displayName = 'MainNavigationItem'

export function SocialLinks() {
	const { social } = useGlobal()

	return (
		<ul className="gap-xs flex flex-row items-center">
			{social?.twitter ? (
				<li>
					<Button variant="ghost" size="icon" asChild>
						<Link aria-label="Twitter feed" href={social.twitter}>
							<TwitterIcon className="size-4 duration-75 ease-linear" />
						</Link>
					</Button>
				</li>
			) : null}
			{social?.facebook ? (
				<li>
					<Button variant="ghost" size="icon" asChild>
						<Link aria-label="Facebook page" href={social.facebook}>
							<FacebookIcon className="size-4 duration-75 ease-linear" />
						</Link>
					</Button>
				</li>
			) : null}
			{social?.instagram ? (
				<li>
					<Button variant="ghost" size="icon" asChild>
						<Link aria-label="Instagram" href={social.instagram}>
							<InstagramIcon className="size-4 duration-75 ease-linear" />
						</Link>
					</Button>
				</li>
			) : null}
			{social?.linkedIn ? (
				<li>
					<Button variant="ghost" size="icon" asChild>
						<Link aria-label="LinkedIn profile" href={social.linkedIn}>
							<LinkedInIcon className="size-4 duration-75 ease-linear" />
						</Link>
					</Button>
				</li>
			) : null}
			{social?.github ? (
				<li>
					<Button variant="ghost" size="icon" asChild>
						<Link aria-label="Github Repository" href={social.github}>
							<GithubIcon className="size-4 duration-75 ease-linear" />
							<span className="sr-only">Github</span>
						</Link>
					</Button>
				</li>
			) : null}
		</ul>
	)
}

export function MainNavigation() {
	const { navigation } = useGlobal()

	return (
		<NavigationMenu>
			<NavigationMenuList className="space-x-md" aria-label="Pages">
				{navigation?.main?.map((mainNavItem) => {
					if (!mainNavItem) return null

					return <MainNavigationItem key={mainNavItem.label} {...mainNavItem} />
				})}
			</NavigationMenuList>
		</NavigationMenu>
	)
}

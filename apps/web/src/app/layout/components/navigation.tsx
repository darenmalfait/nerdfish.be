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
import { stripPreSlash } from '@repo/lib/utils/string'
import { AnimatedBackground } from '@repo/ui/components/animated-background'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import {
	type GlobalNavigationMain,
	type GlobalNavigationMainSub,
} from '~/app/cms/types'
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
						'space-y-sm rounded-base p-md focus-within:outline-active hover:bg-muted group relative flex h-full w-full select-none flex-col justify-end leading-none no-underline outline-none transition-colors',
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
	'focus-outline relative flex cursor-pointer items-center whitespace-nowrap bg-transparent font-bold text-xs capitalize outline-none transition hover:text-primary focus:bg-transparent active:bg-transparent md:text-sm',
	{
		variants: {
			variant: {
				active: '!bg-transparent !text-inverted',
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
						size="sm"
						variant={(variant as ButtonProps['variant']) ?? 'ghost'}
						className={getMainItemClassName({
							variant: isActive ? 'active' : 'default',
						})}
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
				size="sm"
				variant={(variant as ButtonProps['variant']) ?? 'ghost'}
				className={getMainItemClassName({
					variant: isActive ? 'active' : 'default',
				})}
				asChild
			>
				<NavigationMenuTrigger>{label}</NavigationMenuTrigger>
			</Button>
			<NavigationMenuContent className="rounded-base bg-primary">
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

const socialLinkClassName = 'text-xs'

export function SocialLinks() {
	const { social } = useGlobal()

	return (
		<ul className="gap-sm flex flex-row items-center">
			{social?.twitter ? (
				<li>
					<Button variant="ghost" className={socialLinkClassName} asChild>
						<Link
							aria-label="Twitter feed"
							href={social.twitter}
							target="_blank"
						>
							Twitter
						</Link>
					</Button>
				</li>
			) : null}
			{social?.bluesky ? (
				<li>
					<Button variant="ghost" className={socialLinkClassName} asChild>
						<Link
							aria-label="Bluesky feed"
							href={social.bluesky}
							target="_blank"
						>
							Bluesky
						</Link>
					</Button>
				</li>
			) : null}
			{social?.facebook ? (
				<li>
					<Button variant="ghost" className={socialLinkClassName} asChild>
						<Link
							aria-label="Facebook page"
							href={social.facebook}
							target="_blank"
						>
							Facebook
						</Link>
					</Button>
				</li>
			) : null}
			{social?.instagram ? (
				<li>
					<Button variant="ghost" className={socialLinkClassName} asChild>
						<Link
							aria-label="Instagram"
							href={social.instagram}
							target="_blank"
						>
							Instagram
						</Link>
					</Button>
				</li>
			) : null}
			{social?.linkedIn ? (
				<li>
					<Button variant="ghost" className={socialLinkClassName} asChild>
						<Link
							aria-label="LinkedIn profile"
							href={social.linkedIn}
							target="_blank"
						>
							LinkedIn
						</Link>
					</Button>
				</li>
			) : null}
			{social?.github ? (
				<li>
					<Button variant="ghost" className={socialLinkClassName} asChild>
						<Link
							aria-label="Github Repository"
							href={social.github}
							target="_blank"
						>
							Github
						</Link>
					</Button>
				</li>
			) : null}
		</ul>
	)
}

export function MainNavigation() {
	const { navigation } = useGlobal()
	const pathname = usePathname()
	const t = useTranslations('global')
	const ref = React.useRef<HTMLUListElement>(null)

	const activeId = React.useMemo(() => {
		const isActive = navigation?.main?.find((item) => {
			return (
				(item?.href &&
					stripPreSlash(pathname).startsWith(stripPreSlash(item.href))) ??
				item?.sub?.some(
					(subItem) =>
						subItem?.href &&
						stripPreSlash(pathname).startsWith(stripPreSlash(subItem.href)),
				)
			)
		})

		return isActive?.label ?? 'home'
	}, [navigation?.main, pathname])

	return (
		<div
			className={cx(
				'rounded-container bg-popover p-xs fixed inset-x-0 mx-auto w-fit max-w-full',
				'before:empty-content before:rounded-container before:bg-muted/50 before:absolute before:inset-0',
				'bottom-lg md:bottom-auto md:top-5',
			)}
		>
			<NavigationMenu
				ref={ref}
				viewportClassName="-translate-y-[calc(100%+50px)] md:translate-y-0"
			>
				<NavigationMenuList
					className="space-x-xs relative flex flex-1"
					aria-label={t('navigation.pages')}
				>
					<AnimatedBackground
						value={activeId}
						className="rounded-container bg-inverted"
						transition={{
							type: 'spring',
							bounce: 0.2,
							duration: 0.3,
						}}
					>
						{navigation?.main?.map((mainNavItem) => {
							if (!mainNavItem) return null

							return (
								<span key={mainNavItem.label} data-id={mainNavItem.label}>
									<MainNavigationItem {...mainNavItem} />
								</span>
							)
						})}
					</AnimatedBackground>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	)
}

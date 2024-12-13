'use client'

import { cx } from '@nerdfish/utils'
import {
	Button,
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerHeader,
	DrawerTrigger,
	H2,
	H3,
	ScrollArea,
} from '@repo/design-system/components/ui'
import { Logo, MenuIcon, XIcon } from '@repo/design-system/lib/icons'
import { stripPreSlash } from '@repo/design-system/lib/utils/string'
import { useLocale } from '@repo/i18n/client'
import { i18n } from '@repo/i18n/config'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { SocialLinks } from './navigation'
import {
	type GlobalNavigationMain,
	type GlobalNavigationMainSub,
} from '~/app/cms/types'
import { useGlobal } from '~/app/global-provider'
import { ThemeToggle } from '~/app/theme/components/theme-toggle'

const MobileNavigationSubItem = React.forwardRef<
	React.ComponentRef<typeof Link>,
	React.ComponentPropsWithoutRef<typeof Link> & GlobalNavigationMainSub
>(({ href, label, description, className, ...props }, ref) => {
	const pathname = usePathname()
	const isActive = stripPreSlash(pathname).startsWith(stripPreSlash(href))

	return (
		<li>
			<Link ref={ref} href={`/${stripPreSlash(href)}`} {...props}>
				<H3
					className={cx(
						'hover:text-accent border-b-4 border-transparent font-normal capitalize',
						isActive && 'border-b-accent',
					)}
					as="span"
				>
					{label}
				</H3>
			</Link>
		</li>
	)
})
MobileNavigationSubItem.displayName = 'MobileNavigationSubItem'

const MobileNavigationItem = React.forwardRef<
	React.ComponentRef<typeof Link>,
	Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href'> &
		GlobalNavigationMain
>(({ href, label, sub, onClick, ...props }, ref) => {
	const pathname = usePathname()
	if (!sub?.length && !href) return null

	if (!sub?.length) {
		const isActive = stripPreSlash(pathname).startsWith(
			stripPreSlash(href ?? ''),
		)

		return (
			<Link
				href={`/${stripPreSlash(href ?? '')}`}
				onClick={onClick}
				{...props}
				ref={ref}
			>
				<H2
					className={cx(
						'hover:text-accent border-b-4 border-transparent capitalize',
						isActive && 'border-b-accent',
					)}
					variant="primary"
					as="span"
				>
					{label}
				</H2>
			</Link>
		)
	}

	return (
		<div>
			<H2 className="capitalize" variant="primary" as="span">
				{label}
			</H2>
			<ul className="mt-md gap-sm grid">
				{sub.map((subNavItem) => {
					if (!subNavItem) return null

					return (
						<MobileNavigationSubItem
							key={subNavItem.label}
							{...subNavItem}
							onClick={onClick}
						/>
					)
				})}
			</ul>
		</div>
	)
})
MobileNavigationItem.displayName = 'MobileNavigationItem'

export function MobileNavigation() {
	const { navigation } = useGlobal()
	const currentLocale = useLocale()
	const [open, setOpen] = React.useState<boolean>(false)

	return (
		<Drawer direction="right" open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button
					className="lg:hidden"
					variant="ghost"
					type="button"
					size="icon"
					aria-label="Toggle navigation"
				>
					<MenuIcon className="size-4" />
				</Button>
			</DrawerTrigger>
			<DrawerContent hideCloseButton>
				<div className="flex h-screen flex-col">
					<DrawerHeader className="gap-lg py-lg z-10 flex items-center justify-between backdrop-blur-none">
						<Button asChild variant="link" className="-mx-2">
							<Link
								href={`/${currentLocale === i18n.defaultLocale ? '' : currentLocale}`}
								aria-label="Home"
								onClick={() => setOpen(false)}
							>
								<Logo className="h-5 w-auto" />
							</Link>
						</Button>

						<div className="gap-sm flex items-center">
							<DrawerClose asChild className="-mr-sm">
								<Button variant="ghost" type="button" size="icon">
									<XIcon className="size-4" />
								</Button>
							</DrawerClose>
						</div>
					</DrawerHeader>

					<ScrollArea className="px-md w-full flex-1 md:h-auto">
						<ul className="gap-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
							{navigation?.main?.map((navItem) => {
								if (!navItem) return null

								return (
									<li key={navItem.label}>
										<MobileNavigationItem
											{...navItem}
											onClick={() => setOpen(false)}
										/>
									</li>
								)
							})}
						</ul>
						<ul className="mt-xl gap-sm flex flex-row items-center justify-start">
							<li>
								<ThemeToggle />
							</li>
						</ul>
						<div className="mt-md gap-sm pb-lg flex flex-row items-center">
							<span className="font-bold">Socials:</span>
							<SocialLinks />
						</div>
					</ScrollArea>
				</div>
			</DrawerContent>
		</Drawer>
	)
}

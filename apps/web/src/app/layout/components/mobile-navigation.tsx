'use client'

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
} from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { stripPreSlash } from '@repo/lib/utils/string'
import { Logo, MenuIcon, XIcon } from '@repo/ui/icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import type {
	GlobalNavigationMain,
	GlobalNavigationMainSub,
} from '~/app/cms/types'
import { useGlobal } from '~/app/global-provider'
import { ThemeToggle } from '~/app/theme/components/theme-toggle'
import { SocialLinks } from './navigation'

const MobileNavigationSubItem = React.forwardRef<
	React.ElementRef<typeof Link>,
	React.ComponentPropsWithoutRef<typeof Link> & GlobalNavigationMainSub
>(({ href, label, description, className, ...props }, ref) => {
	const pathname = usePathname()
	const isActive = stripPreSlash(pathname).startsWith(stripPreSlash(href))

	return (
		<li>
			<Link ref={ref} href={`/${stripPreSlash(href)}`} {...props}>
				<H3
					className={cx(
						'border-transparent border-b-4 font-normal capitalize hover:text-accent',
						isActive && 'border-b-accent'
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
	React.ElementRef<typeof Link>,
	Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href'> &
		GlobalNavigationMain
>(({ href, label, sub, onClick, ...props }, ref) => {
	const pathname = usePathname()
	if (!sub?.length && !href) return null

	if (!sub?.length) {
		const isActive = stripPreSlash(pathname).startsWith(
			stripPreSlash(href ?? '')
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
						'border-transparent border-b-4 capitalize hover:text-accent',
						isActive && 'border-b-accent'
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
			<ul className="mt-md grid gap-sm">
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
					<DrawerHeader className="z-10 flex items-center justify-between gap-lg py-lg backdrop-blur-none">
						<Button asChild variant="link" className="-mx-2">
							<Link href="/" aria-label="Home" onClick={() => setOpen(false)}>
								<Logo className="h-5 w-auto" />
							</Link>
						</Button>

						<div className="flex items-center gap-sm">
							<DrawerClose asChild className="-mr-sm">
								<Button variant="ghost" type="button" size="icon">
									<XIcon className="size-4" />
								</Button>
							</DrawerClose>
						</div>
					</DrawerHeader>

					<ScrollArea className="w-full flex-1 px-md md:h-auto">
						<ul className="grid grid-cols-1 gap-lg sm:grid-cols-2 md:grid-cols-3">
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
						<ul className="mt-xl flex flex-row items-center justify-start gap-sm">
							<li>
								<ThemeToggle variant="ghost" />
							</li>
						</ul>
						<div className="mt-md flex flex-row items-center gap-sm pb-lg">
							<span className="font-bold">Socials:</span>
							<SocialLinks />
						</div>
					</ScrollArea>
				</div>
			</DrawerContent>
		</Drawer>
	)
}

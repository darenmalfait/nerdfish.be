'use client'

import {
	Button,
	Drawer,
	DrawerContent,
	DrawerTrigger,
	H2,
	H3,
	ScrollArea,
} from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { stripPreSlash } from '@nerdfish-website/lib/utils'
import { Icons } from '@nerdfish-website/ui/icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { type GlobalNavigationMain, type GlobalNavigationMainSub } from '../cms'
import { useGlobal } from '../global-provider'
import { ActionsNavigation, RSSFeedButton, SocialLinks } from './navigation'
import { ThemeToggle } from './theme-toggle'

const MobileNavigationSubItem = React.forwardRef<
	React.ElementRef<typeof Link>,
	React.ComponentPropsWithoutRef<typeof Link> & GlobalNavigationMainSub
>(({ href, label, description, className, ...props }, ref) => {
	const pathname = usePathname()
	const isActive = stripPreSlash(pathname).startsWith(href)

	return (
		<li>
			<Link ref={ref} href={`/${stripPreSlash(href)}`} {...props}>
				<H3
					className={cx(
						'hover:text-accent border-b-4 border-transparent capitalize',
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
	React.ElementRef<typeof Link>,
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
					blurredClassName="hidden"
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
			<H2
				className="capitalize"
				blurredClassName="hidden"
				variant="primary"
				as="span"
			>
				{label}
			</H2>
			<ul className="mt-3 grid gap-3">
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
					<Icons.Hamburger className="size-4" />
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="container mx-auto flex h-full w-screen flex-col gap-12 px-6 py-6">
					<div className="flex items-center justify-between gap-2">
						<Link href="/" aria-label="Home" onClick={() => setOpen(false)}>
							<Icons.Logo className="h-5 w-auto transition-transform hover:scale-105" />
						</Link>
						<div className="flex flex-row items-center justify-end gap-2">
							<ThemeToggle variant="ghost" />
							<RSSFeedButton />
							<ActionsNavigation
								onSelect={() => {
									setOpen(false)
								}}
							/>
						</div>
					</div>
					<ScrollArea className="w-full flex-1 md:h-auto">
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
							{navigation?.main?.map((navItem) => {
								if (!navItem) return null

								return (
									<MobileNavigationItem
										key={navItem.label}
										{...navItem}
										onClick={() => setOpen(false)}
									/>
								)
							})}
							<MobileNavigationItem
								label="AI"
								href="/ai"
								onClick={() => setOpen(false)}
							/>
						</div>
					</ScrollArea>

					<div className="sticky bottom-0 flex gap-2">
						<div className="flex flex-row items-center gap-3">
							<span className="font-bold">Socials:</span>
							<SocialLinks />
						</div>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	)
}

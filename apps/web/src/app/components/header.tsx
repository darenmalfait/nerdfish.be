'use client'

import { Button } from '@nerdfish/ui'
import { Icons } from '@nerdfish-website/ui/icons'
import Link from 'next/link'

import { MobileNavigation } from './mobile-navigation'
import { ActionsNavigation, MainNavigation, RSSFeedButton } from './navigation'
import { ThemeToggle } from './theme-toggle'

export function Header() {
	return (
		<div className="absolute top-8 z-50 mx-auto w-full px-4">
			<div className="bg-muted/80 relative mx-auto flex w-full items-center justify-center gap-4 rounded-full px-3 py-2 sm:w-fit sm:gap-6 xl:min-w-[65ch]">
				<div className="flex-1 sm:flex-grow-0">
					<Button asChild variant="ghost">
						<Link href="/" aria-label="Home">
							<Icons.Logo className="h-5 w-auto" />
						</Link>
					</Button>
				</div>
				<div className="hidden justify-end sm:flex md:justify-center">
					<nav className="flex rounded-full px-3 text-sm font-medium sm:space-x-2">
						<MainNavigation />
					</nav>
				</div>
				<div className="flex flex-1 justify-end space-x-2 sm:flex-grow-0">
					<ThemeToggle variant="ghost" />
					<RSSFeedButton className="xsm:flex hidden" />
					<ActionsNavigation className="hidden md:flex" />
					<MobileNavigation />
				</div>
			</div>
		</div>
	)
}

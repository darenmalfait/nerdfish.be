'use client'

import { Button } from '@nerdfish/ui'
import { Icons } from '@nerdfish-website/ui/icons'
import Link from 'next/link'

import { MobileNavigation } from './mobile-navigation'
import { ActionsNavigation, MainNavigation, RSSFeedButton } from './navigation'
import { ThemeToggle } from './theme-toggle'

export function Header() {
	return (
		<div className="container sticky top-8 z-50 mx-auto px-4">
			<div className="bg-muted relative mx-auto flex w-fit items-center justify-center gap-4 rounded-full px-3 py-2">
				<div className="flex">
					<Button asChild variant="ghost">
						<Link href="/" aria-label="Home">
							<Icons.Logo className="h-5 w-auto" />
						</Link>
					</Button>
				</div>
				<div className="hidden justify-end md:justify-center lg:flex">
					<nav className="flex rounded-full px-3 text-sm font-medium lg:space-x-2">
						<MainNavigation />
					</nav>
				</div>
				<div className="flex justify-end space-x-2">
					<ThemeToggle variant="ghost" />
					<RSSFeedButton className="xsm:flex hidden" />
					<ActionsNavigation className="hidden md:flex" />
					<MobileNavigation />
				</div>
			</div>
		</div>
	)
}

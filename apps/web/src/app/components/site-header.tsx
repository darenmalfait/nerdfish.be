'use client'

import { Button, Separator } from '@nerdfish/ui'
import { Logo } from '@nerdfish-website/ui/icons'
import Link from 'next/link'
import { useTranslation } from '../[locale]/translation-provider'
import { MobileNavigation } from './mobile-navigation'
import { ActionsNavigation, MainNavigation } from './navigation'
import { ThemeToggle } from './theme-toggle'

export function SiteHeader() {
	const { currentLocale } = useTranslation()

	return (
		<div className="w-full">
			<header className="relative z-50 w-full flex-none">
				<nav className="mx-auto w-full px-4 lg:container">
					<div className="relative flex w-full items-center py-[2.125rem]">
						<Button asChild variant="link" className="-mx-2">
							<Link href={`/${currentLocale}`} aria-label="Home">
								<Logo className="h-5 w-auto" />
							</Link>
						</Button>
						<div className="ml-auto flex items-center">
							<div className="hidden flex-1 lg:flex">
								<MainNavigation />
							</div>
							<Separator
								orientation="vertical"
								className="mx-2 hidden h-6 lg:block"
							/>
							<div className="flex flex-1 justify-end space-x-2 sm:flex-grow-0">
								<ThemeToggle variant="ghost" />
								<ActionsNavigation className="hidden md:flex" />
								<MobileNavigation />
							</div>
						</div>
					</div>
				</nav>
			</header>
		</div>
	)
}

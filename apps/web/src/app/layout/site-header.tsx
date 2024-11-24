'use client'

import { Button } from '@nerdfish/ui'
import { Logo } from '@nerdfish-website/ui/icons'
import Link from 'next/link'
import * as React from 'react'
import { MobileNavigation } from './mobile-navigation'
import { MainNavigation } from './navigation'
import { LocaleSwitcher, useTranslation } from '~/app/i18n'
import { ThemeToggle } from '~/app/theme'

export function SiteHeader() {
	const { currentLocale } = useTranslation()

	return (
		<div className="w-full bg-transparent">
			<header className="relative z-50 w-full flex-none">
				<nav className="px-lg mx-auto w-full">
					<div className="py-lg relative flex w-full items-center">
						<Button asChild variant="link" className="-mx-sm">
							<Link
								href={`/${currentLocale}`}
								aria-label="Home"
								className="hover:animate-squeeze"
							>
								<Logo className="h-5 w-auto" />
							</Link>
						</Button>
						<div className="ml-auto flex items-center">
							<div className="p-xs bg-popover shadow-outline rounded-large fixed inset-x-0 top-7 mx-auto hidden w-fit max-w-full md:block">
								<MainNavigation />
							</div>

							<div className="space-x-sm flex flex-1 justify-end sm:flex-grow-0">
								<ThemeToggle variant="ghost" />
								<LocaleSwitcher />
								<MobileNavigation />
							</div>
						</div>
					</div>
				</nav>
			</header>
		</div>
	)
}

'use client'

import { Button } from '@nerdfish/ui'
import { Logo } from '@nerdfish-website/ui/icons'
import Link from 'next/link'
import * as React from 'react'
import { MainNavigation } from './navigation'
import { LocaleSwitcher, useTranslation } from '~/app/i18n'
import { ThemeToggle } from '~/app/theme'

export function SiteHeader() {
	const { currentLocale } = useTranslation()

	return (
		<div className="w-full bg-transparent">
			<header className="relative z-50 w-full flex-none">
				<nav className="px-md mx-auto w-full">
					<div className="py-lg relative flex w-full items-center">
						<Button asChild variant="link" className="-mx-sm text-primary">
							<Link href={`/${currentLocale}`} aria-label="Home">
								<Logo className="h-6 w-auto fill-white" />
							</Link>
						</Button>
						<div className="ml-auto flex items-center">
							<MainNavigation />

							<div className="space-x-sm flex flex-1 justify-end sm:flex-grow-0">
								<ThemeToggle variant="ghost" />
								<LocaleSwitcher />
								{/* TODO: add mobile navigation if too many items */}
								{/* <MobileNavigation /> */}
							</div>
						</div>
					</div>
				</nav>
			</header>
		</div>
	)
}

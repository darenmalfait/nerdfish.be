'use client'

import { Button } from '@nerdfish/ui'
import { Logo } from '@repo/ui/icons'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { LocaleSwitcher } from '~/app/i18n/components/locale-switcher'
import { ThemeToggle } from '~/app/theme/components/theme-toggle'
import { MainNavigation } from './navigation'

export function SiteHeader() {
	const currentLocale = useLocale()

	return (
		<div className="w-full bg-transparent">
			<header className="relative z-50 w-full flex-none">
				<nav className="container max-w-none">
					<div className="relative flex w-full items-center py-lg">
						<Button asChild variant="link" className="-mx-sm text-primary">
							<Link href={`/${currentLocale}`} aria-label="Home">
								<Logo className="h-6 w-auto fill-white" />
							</Link>
						</Button>
						<div className="ml-auto flex items-center">
							<MainNavigation />

							<div className="flex flex-1 justify-end space-x-sm sm:flex-grow-0">
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

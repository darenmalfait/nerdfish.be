'use client'

import { Button } from '@nerdfish/ui'
import { Logo } from '@repo/ui/icons'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { MainNavigation } from './navigation'
import { LocaleSwitcher } from '~/app/i18n/components/locale-switcher'

export function SiteHeader() {
	const currentLocale = useLocale()

	return (
		<div className="w-full bg-transparent">
			<header className="relative z-40 w-full flex-none">
				<div className="container max-w-none">
					<div className="py-mdx relative flex w-full items-center">
						<Button asChild variant="link" className="-mx-sm text-primary">
							<Link href={`/${currentLocale}`} aria-label="Home">
								<Logo className="h-6 w-auto fill-white" />
							</Link>
						</Button>
						<div className="ml-auto flex items-center">
							<MainNavigation />

							<div className="space-x-sm flex flex-1 justify-end sm:flex-grow-0">
								<LocaleSwitcher />
								{/* TODO: add mobile navigation if too many items */}
								{/* <MobileNavigation /> */}
							</div>
						</div>
					</div>
				</div>
			</header>
		</div>
	)
}

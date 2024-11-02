'use client'

import { H3, Separator } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { stripPreSlash } from '@nerdfish-website/lib/utils'
import { Logo } from '@nerdfish-website/ui/icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { RSSFeedButton, SocialLinks } from './navigation'
import { ThemeToggle } from './theme-toggle'
import { useGlobal } from '~/app/[locale]/global-provider'
import {
	type GlobalNavigationMain,
	type GlobalNavigationMainSub,
} from '~/app/cms'
import { LocaleSwitcher } from '~/app/i18n'

const FooterNavigationSubItem = React.forwardRef<
	React.ElementRef<typeof Link>,
	React.ComponentPropsWithoutRef<typeof Link> & GlobalNavigationMainSub
>(({ href, label, description, className, ...props }, ref) => {
	const pathname = usePathname()

	const isActive = stripPreSlash(pathname).startsWith(stripPreSlash(href))

	return (
		<li>
			<Link ref={ref} href={`/${stripPreSlash(href)}`} {...props}>
				<span
					className={cx(
						'hover:text-accent text-muted border-b-4 border-transparent capitalize',
						isActive && 'border-b-accent',
					)}
				>
					{label}
				</span>
			</Link>
		</li>
	)
})
FooterNavigationSubItem.displayName = 'FooterNavigationSubItem'

const FooterNavigationItem = React.forwardRef<
	React.ElementRef<typeof Link>,
	Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href'> &
		GlobalNavigationMain
>(({ href, label, sub, ...props }, ref) => {
	const pathname = usePathname()

	if (!sub?.length && !href) return null

	if (!sub?.length) {
		const isActive = stripPreSlash(pathname).startsWith(
			stripPreSlash(href ?? ''),
		)

		return (
			<Link href={`/${stripPreSlash(href ?? '')}`} ref={ref} {...props}>
				<H3
					className={cx(
						'hover:text-accent border-b-4 border-transparent capitalize',
						isActive && 'border-b-accent',
					)}
					blurredClassName="hidden"
					variant="primary"
					as="span"
				>
					{label}
				</H3>
			</Link>
		)
	}

	return (
		<div>
			<H3
				className="capitalize"
				blurredClassName="hidden"
				variant="primary"
				as="span"
			>
				{label}
			</H3>
			<ul className="mt-md gap-sm grid">
				{sub.map((subNavItem) => {
					if (!subNavItem) return null

					return (
						<FooterNavigationSubItem key={subNavItem.label} {...subNavItem} />
					)
				})}
			</ul>
		</div>
	)
})
FooterNavigationItem.displayName = 'FooterNavigationItem'

function Disclaimer() {
	const { companyInfo } = useGlobal()

	const currentYear = new Date().getFullYear()

	return (
		<div className="space-y-md py-lg">
			<p className="text-muted max-w-2xl text-lg lg:text-xl">
				Made by{' '}
				<Link
					className="text-primary cursor-pointer font-medium transition duration-300 hover:opacity-70"
					href="https://www.nerdfish.be"
				>
					nerdfish
				</Link>
				, development with user experience in mind. The code is{' '}
				<Link
					className="text-primary cursor-pointer font-medium transition duration-300 hover:opacity-70"
					href="https://github.com/darenmalfait/nerdfish.be"
					target="_blank"
				>
					open-source
				</Link>
				.
			</p>
			<div className="-mx-md">
				<SocialLinks />
			</div>
			<div className="text-muted flex justify-start text-xs font-normal">
				© {companyInfo?.companyName} {currentYear}.
			</div>
		</div>
	)
}

export function Footer() {
	const { navigation } = useGlobal()

	return (
		<div className="mt-xl py-lg">
			<footer
				className="text-primary px-md container mx-auto"
				aria-labelledby="footer-heading"
			>
				<h2 id="footer-heading" className="sr-only">
					Footer
				</h2>
				<nav className="pb-lg mx-auto">
					<div className="space-y-md mb-12">
						<div className="flex items-center justify-between">
							<div className="flex h-12 items-center">
								<Logo className="relative h-6 w-auto rounded-full" />
							</div>
							<ul className="gap-sm flex items-center">
								<li>
									<ThemeToggle variant="ghost" />
								</li>
								<li>
									<RSSFeedButton className="xsm:flex hidden" />
								</li>
								<li>
									<LocaleSwitcher />
								</li>
							</ul>
						</div>
					</div>
					<div className="gap-lg xl:grid">
						<div className="mt-lg gap-lg grid grid-cols-3 xl:col-span-2">
							{navigation?.main?.map((navItem) => {
								if (!navItem) return null

								return <FooterNavigationItem key={navItem.label} {...navItem} />
							})}
						</div>
					</div>
				</nav>
				<Separator className="my-lg" />
				<Disclaimer />
			</footer>
		</div>
	)
}

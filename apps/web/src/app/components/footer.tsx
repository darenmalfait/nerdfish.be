'use client'

import {
	H3,
	Separator,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { stripPreSlash } from '@nerdfish-website/lib/utils'
import { Logo } from '@nerdfish-website/ui/icons'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import fish from '../../assets/images/nerdfish.png'
import { type GlobalNavigationMain, type GlobalNavigationMainSub } from '../cms'
import { useGlobal } from '../global-provider'
import { SocialLinks } from './navigation'

const FooterNavigationSubItem = React.forwardRef<
	React.ElementRef<typeof Link>,
	React.ComponentPropsWithoutRef<typeof Link> & GlobalNavigationMainSub
>(({ href, label, description, className, ...props }, ref) => {
	const pathname = usePathname()
	const isActive = stripPreSlash(pathname).startsWith(href)

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
			<ul className="mt-3 grid gap-3">
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
	const currentYear = new Date().getFullYear()

	return (
		<div className="space-y-6 py-8">
			<p className="text-muted max-w-2xl text-lg lg:text-xl">
				Made by{' '}
				<span aria-hidden>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Link
									className="text-primary cursor-pointer font-medium transition duration-300 hover:opacity-70"
									href="https://www.nerdfish.be"
								>
									nerdfish
								</Link>
							</TooltipTrigger>
							<TooltipContent className="bg-inverted shadow-outline">
								<Image src={fish} alt="nerdy fish" width={100} height={100} />
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</span>
				<Link className="sr-only" href="https://www.nerdfish.be">
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
			<div className="-mx-4">
				<SocialLinks />
			</div>
			<div className="text-muted flex justify-start text-xs font-normal">
				© Daren Malfait BV {currentYear}.
			</div>
		</div>
	)
}

function Footer() {
	const { navigation } = useGlobal()

	return (
		<div className="mt-16 py-8">
			<footer
				className="text-primary container mx-auto px-4"
				aria-labelledby="footer-heading"
			>
				<h2 id="footer-heading" className="sr-only">
					Footer
				</h2>
				<nav className="mx-auto pb-8">
					<div className="gap-8 xl:grid xl:gap-16">
						<div className="space-y-4">
							<div className="flex items-center">
								<div className="flex h-12 items-center">
									<Logo className="relative h-6 w-auto rounded-full" />
								</div>
							</div>
						</div>
						<div className="mt-16 grid grid-cols-3 gap-8 xl:col-span-2 xl:mt-0">
							{navigation?.main?.map((navItem) => {
								if (!navItem) return null

								return <FooterNavigationItem key={navItem.label} {...navItem} />
							})}

							<FooterNavigationItem aria-label="AI" label="AI" href="/ai" />
						</div>
					</div>
				</nav>
				<Separator />
				<Disclaimer />
			</footer>
		</div>
	)
}

export { Footer }

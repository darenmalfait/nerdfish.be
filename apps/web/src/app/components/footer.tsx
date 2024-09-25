'use client'

import { H3 } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { stripPreSlash } from '@nerdfish-website/lib/utils'
import { Icons } from '@nerdfish-website/ui/icons'
import Link from 'next/link'

import { usePathname } from 'next/navigation'
import * as React from 'react'
import { type GlobalNavigationMain, type GlobalNavigationMainSub } from '../cms'
import { useGlobal } from '../global-provider'
import { SocialLinks } from './navigation'
import { ThemeToggle } from './theme-toggle'

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
						'hover:text-accent border-b-4 border-transparent capitalize',
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

function FooterNavigationItem({ href, label, sub }: GlobalNavigationMain) {
	const pathname = usePathname()
	if (!sub?.length && !href) return null

	if (!sub?.length) {
		const isActive = stripPreSlash(pathname).startsWith(href ?? '')

		return (
			<Link href={`/${stripPreSlash(href ?? '')}`}>
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
}

function Footer() {
	const { social, navigation } = useGlobal()

	const github = social?.github
	const twitter = social?.twitter

	return (
		<div className="bg-muted mt-24">
			<footer
				className="text-primary container mx-auto px-4"
				aria-labelledby="footer-heading"
			>
				<h2 id="footer-heading" className="sr-only">
					Footer
				</h2>
				<div className="mx-auto px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
					<div className="gap-8 xl:grid xl:grid-cols-3 xl:gap-16">
						<div className="space-y-8">
							<div className="flex items-center">
								<div className="flex h-12 items-center">
									<Icons.Logo className="relative h-6 w-auto rounded-full" />
								</div>
							</div>
							<p className="text-muted text-base leading-6">
								Made by{' '}
								<Link
									className="underline"
									href={twitter ?? github ?? 'https://www.nerdfish.be'}
								>
									nerdfish
								</Link>
								, development with user experience in mind.
							</p>
						</div>
						<div className="mt-16 grid grid-cols-3 gap-8 xl:col-span-2 xl:mt-0">
							{navigation?.main?.map((navItem) => {
								if (!navItem) return null

								return <FooterNavigationItem key={navItem.label} {...navItem} />
							})}
						</div>
					</div>
					<div className="mt-16 flex items-center border-t border-black/10 pt-8 sm:mt-20 md:justify-start lg:mt-24 dark:border-white/10">
						<div className="flex flex-row items-center gap-3">
							<ThemeToggle className="flex size-10 items-center justify-center transition" />
							<SocialLinks />
						</div>
					</div>
				</div>
			</footer>
		</div>
	)
}

export { Footer }

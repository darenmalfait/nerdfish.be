'use client'

import { H1, H3, Separator } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { stripPreSlash } from '@nerdfish-website/lib/utils'
import { ArrowRight } from '@nerdfish-website/ui/icons'
import { useInView } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { SocialLinks } from './navigation'
import {
	type GlobalNavigationMain,
	type GlobalNavigationMainSub,
} from '~/app/cms'
import { useGlobal } from '~/app/global-provider'

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

function SiteFooterHeading() {
	const { paths } = useGlobal()
	const ref = React.useRef<HTMLHeadingElement>(null)

	const inView = useInView(ref, { once: true })

	return (
		<H1 as="h2" ref={ref} className="mb-2xl text-primary">
			<Link
				href={paths?.contact ?? '/'}
				className="group"
				aria-label="Let’s work together"
			>
				<span
					className={cx({
						'motion-preset-slide-up motion-delay-300 motion-duration-1000 inline-block':
							inView,
					})}
				>
					Let’s work{' '}
					<ArrowRight className="ml-xs group-hover:text-accent group-hover:translate-x-xs inline size-8 transform duration-300 md:size-12 lg:size-16" />
				</span>
				<br />

				<span
					className={cx({
						'motion-preset-slide-up motion-delay-500 motion-duration-1000 inline-block':
							inView,
					})}
				>
					together
				</span>
			</Link>
		</H1>
	)
}

export const SiteFooter = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => {
	const { navigation } = useGlobal()

	return (
		<div ref={ref} className={cx('py-lg mt-lg', className)} {...props}>
			<footer
				className="text-primary px-lg mx-auto"
				aria-labelledby="footer-heading"
			>
				<SiteFooterHeading />
				<nav className="pb-lg mx-auto">
					<div className="gap-lg xl:grid">
						<div className="mt-lg gap-lg xsm:grid-cols-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
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
})

SiteFooter.displayName = 'SiteFooter'
